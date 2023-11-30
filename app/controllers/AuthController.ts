import Redis from "../services/Redis";
import DB from "../services/DB";
import Authenticate from "../services/Authenticate";
import { redirectParamsURL } from "../services/GoogleAuth";
import axios from "axios";
import { generateUUID } from "../services/helper";
import dayjs from "dayjs";
import Mailer from "../services/Mailer";
import { Response, Request } from "../../type"; 
import { view } from "../services/View";

class AuthController {
   public async registerPage(request : Request, response: Response) {
      if (request.cookies.auth_id) {
         return response.redirect("/auth/home");
      }

      return response.inertia("auth/register");
   }

   public async homePage(request : Request, response: Response) {


      return response.type("html").send(view("home.html"));

     
   }

   public async profilePage(request : Request, response: Response) { 
      return response.inertia("profile");
   }

   public async changeProfile(request : Request, response: Response) {
      const data = await request.json();

      await DB.from("users").where("id", request.user.id).update({
         name: data.name,
         email: data.email.toLowerCase(),
         phone: data.phone,
      });

      return response.json({ message: "Your profile has been updated" });
   }

   public async changePassword(request : Request, response: Response) {
      const data = await request.json();

      const user = await DB.from("users")
         .where("id", request.user.id)
         .first();

      const password_match = await Authenticate.compare(
         data.current_password,
         user.password
      );

      if (password_match) {
         await DB.from("users")
            .where("id", request.user.id)
            .update({
               password: await Authenticate.hash(data.new_password),
            });
      } else {
         return response
            .status(400)
            .json({ message: "Password lama tidak cocok" });
      }
   }

   public async forgotPasswordPage(request : Request, response: Response) {
      return response.inertia("auth/forgot-password");
   }
   public async resetPasswordPage(request : Request, response: Response) {
      const id = request.params.id;

      const user_id = await Redis.get("reset-password:" + id);

      if (!user_id) {
         return response.status(404).send("Link tidak valid");
      }

      return response.inertia("auth/reset-password", { id: request.params.id });
   }

   public async resetPassword(request : Request, response: Response) {
      const { id, password } = await request.json();

      const user_id = await Redis.get("reset-password:" + id);

      if (!user_id) {
         return response.status(404).send("Link tidak valid");
      }

      await DB.from("users")
         .where("id", user_id)
         .update({ password: await Authenticate.hash(password) });

      const user = await DB.from("users").where("id", user_id).first();

      return Authenticate.process(user, request, response);
   }
   public async sendResetPassword(request : Request, response: Response) {
      let { email, phone } = await request.json();

      console.log(phone);
      let user;

      if (email && email.includes("@")) {
         user = await DB.from("users").where("email", email).first();
      } else if (phone) {
         user = await DB.from("users").where("phone", phone).first();
      }

      if (!user) {
         return response.status(404).send("Email tidak terdaftar");
      }

      const id = generateUUID();

      try {
         await Mailer.sendMail({
            from: '"Dripsender Auth" <dripsender.id@gmail.com>',
            to: email,
            subject: "Reset Password",
            text: `Anda telah melakukan reset password. Jika itu benar, silakan Klik link berikut : 
      
        ${process.env.APP_URL}/reset-password/${id}
        
        Jika anda tidak merasa melakukan reset password, abaikan email ini.
              `,
         });
      } catch (error) {}

      try {
         if (user.phone)
            await axios.post("https://api.dripsender.id/send", {
               api_key: "ee042c8b-f5e1-4366-abc1-ee771d209384",
               phone: user.phone,
               text: `Anda telah melakukan reset password. Jika itu benar, silakan Klik link berikut : 
      
${process.env.APP_URL}/reset-password/${id}
          
Jika anda tidak merasa melakukan reset password, abaikan pesan  ini.
                `,
            });
      } catch (error) {}

      await Redis.setEx("reset-password:" + id, 60 * 60 * 24, user.id);

      return response.send("OK");
   }

   public async loginPage(request : Request, response: Response) {
      return response.inertia("auth/login");
   }

   public async redirect(request : Request, response) {
      const params = redirectParamsURL();

      const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;

      return response.redirect(googleLoginUrl);
   }

   public async googleCallback(request : Request, response: Response) {
      const { code } = request.query;

      const { data } = await axios({
         url: `https://oauth2.googleapis.com/token`,
         method: "post",
         data: {
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            grant_type: "authorization_code",
            code,
         },
      });

      const result = await axios({
         url: "https://www.googleapis.com/oauth2/v2/userinfo",
         method: "get",
         headers: {
            Authorization: `Bearer ${data.access_token}`,
         },
      });

      let { email, name, verified_email } = result.data;

      email = email.toLowerCase();

      const check = await DB.from("users").where("email", email).first();

      if (check) {
         //
         return Authenticate.process(check, request, response);
      } else {
         const user = {
            id: generateUUID(),
            email: email,
            password: await Authenticate.hash(email),
            name: name,
            is_verified: false,
            created_at: dayjs().valueOf(),
            updated_at: dayjs().valueOf(),
         };

         await DB.table("users").insert(user);

         return Authenticate.process(user, request, response);
      }
   }

   public async processLogin(request : Request, response: Response) {
      let body = await request.json();

      let { email, password, phone } = body;

      let user;

      if (email && email.includes("@")) {
         user = await DB.from("users").where("email", email).first();
      } else if (phone) {
         user = await DB.from("users").where("phone", phone).first();
      }

      if (user) {
         const password_match = await Authenticate.compare(
            password,
            user.password
         );

         if (password_match) {
            return Authenticate.process(user, request, response);
         } else {
            return response
               .flash("error", "Maaf, Password salah")
               .redirect("/login");
         }
      } else {
         return response
            .flash("error", "Email/No.HP tidak terdaftar")
            .redirect("/login");
      }
   }

   public async processRegister(request : Request, response: Response) {
      let { email, password, name } = await request.json();

      email = email.toLowerCase();

      try {
         const user = {
            email: email,
            id: generateUUID(),
            name,
            password: await Authenticate.hash(password),
         };

         const id = await DB.table("users").insert(user);

         return Authenticate.process(user, request, response);
      } catch (error) {
         console.log(error);
         return response
            .cookie("error", "Maaf, Email sudah terdaftar")
            .redirect("/register");
      }
   }

   public async verify(request : Request, response: Response) {
      const id = generateUUID();

      try {
         await Mailer.sendMail({
            from: '"Dripsender Auth" <dripsender.id@gmail.com>',
            to: request.user.email,
            subject: "Verifikasi Akun",
            text:
               "Klik link berikut untuk verifikasi email anda : " +
               process.env.APP_URL +
               "/auth/verify/" +
               id,
         });
      } catch (error) {
         console.log(error);

         return response.redirect("/auth/home");
      }

      await Redis.setEx("verifikasi-user:" + request.user.id, 60 * 60 * 24, id);

      return response.redirect("/auth/home");
   }

   public async verifyPage(request : Request, response: Response) {
      const { id } = request.params;

      const verifikasi = await Redis.get("verifikasi-user:" + request.user.id);

      if (verifikasi == id) {
         await DB.from("users")
            .where("id", request.user.id)
            .update({ is_verified: true });
      }

      return response.redirect("/auth/home?verified=true");
   }

   public async logout(request : Request, response: Response) {
      if (request.cookies.auth_id) {
         await Authenticate.logout(request, response);
      }
   }
}

export default new AuthController();
