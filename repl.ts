 
import Database from "./app/services/DB";  
 
(async()=>{
  
  const orders = await Database.table("users")
 
  console.log(orders)
 
 
  process.exit(1)
})()