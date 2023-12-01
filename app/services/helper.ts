import {v4} from "uuid";

import manifest from "../../public/manifest.json"; 
export function generateUUID() {
    return v4();
}

export function asset(path)
{ 
  return manifest[path];
  
}

export function generateChars(length : number = 6) {
    let result = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }