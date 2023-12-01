import { Response, Request } from "../../type";
import DB from "../services/DB";
import { generateChars } from "../services/helper";

class Controller {
   public async index(request: Request, response: Response) {}

   public async create(request: Request, response: Response) {}

   public async store(request: Request, response: Response) {
      const data = await request.json();

      if (!data.slug) {
         data.slug =
            data.title.toLowerCase().replace(/ /g, "-") + generateChars(5);
      }

      const check = await DB.from("posts").where("slug", data.slug).first();

      if (check) {
         return response.status(400).json({ error: "Slug already exists" });
      }

      

      await DB.from("posts").insert({
         title: data.title,
         slug: data.slug,
         content: data.content,
         author_id: request.user.id,
         author_name: request.user.name,
         thumbnail: data.thumbnail,
         category: data.category,
         status: data.status,
      });
   }

   public async show(request: Request, response: Response) {}

   public async edit(request: Request, response: Response) {}

   public async update(request: Request, response: Response) {}

   public async destroy(request: Request, response: Response) {}
}

export default new Controller();
