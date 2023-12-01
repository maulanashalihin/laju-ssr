import AuthController from "../app/controllers/AuthController"; 
import PostController from "../app/controllers/PostController";
import Auth from "../app/middlewares/auth"
import { view } from "../app/services/View";


import { Response } from "../type";

import { Request } from "hyper-express";
 
import  HyperExpress from 'hyper-express';

const Route = new HyperExpress.Router();


// guest routes

Route.get("/login",AuthController.loginPage);

Route.get("/google/redirect",AuthController.redirect);

Route.get("/google/callback",AuthController.googleCallback);
 

Route.post("/login",AuthController.processLogin);

Route.get("/register",AuthController.registerPage);

Route.post("/register",AuthController.processRegister);

Route.post("/logout",AuthController.logout)

// auth routes
Route.use("/auth",Auth)

Route.get("/auth/home",AuthController.homePage) 



Route.get("/auth/profile",AuthController.profilePage)

Route.post("/auth/change-profile",AuthController.changeProfile)

Route.post("/auth/change-password",AuthController.changePassword)

Route.post("/auth/api/post",PostController.store)
 

Route.get("/",async (req : Request,res : Response)=>{  


    return res.type("html").send(view("index.html",{
        name : "Maulana Malik Ibrahim",
        "phone" : "08123456789",
    }))
  
}) 

Route.get("/page",async (req : Request,res : Response)=>{  


 

    return res.type("html").send(view("page.html",{
        svelte_component : "App.svelte",
    }))
  
}) 

 

Route.get("/auth/write",async (req : Request,res : Response)=>{  


    return   res.view("editor.html")
  
}) 



export default Route;