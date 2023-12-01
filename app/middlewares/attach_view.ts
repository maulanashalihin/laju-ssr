 
import { view } from "../services/View"; 
let pkg = require("../../package.json");

const attach_view = () => {
   return (req, res, next) => {
      res.view = async (page, viewProps = {}) => {
        

         let props = { ...viewProps, error : null, user : req.user || {}  } as any;

         

         if(req.cookies.error)
         {
            props.error = req.cookies.error; 
         }

         const html = await view(page, props);

         return res.type("html").send(html);
      };

      next();
   };
};

export default attach_view;
