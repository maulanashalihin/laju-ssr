import { readFileSync, readdirSync, statSync } from "fs";
const manifest = require("../../public/manifest.json");
import path from "path";

let html_files = {} as {
   [key: string]: string;
};
 
function importFiles(directory = "resources/cache-view") {
   const files = readdirSync(directory);

   for (const filename of files) {
      const results = statSync(path.join(directory, filename));

      if (results.isDirectory()) {
         importFiles(path.join(directory, filename)); // recursive call to get all files
      } else {
         const html = readFileSync(path.join(directory, filename), "utf8");

         html_files[directory + "/" + filename] = html;
      }
   }
}
export function view(filename: string, view_data?: any) {
   let directory = "resources/cache-view";

   const keys = Object.keys(view_data || {});

   let html = process.env.CACHE_VIEW == "true" ?  html_files[directory + "/" + filename] : readFileSync(path.join(directory, filename), "utf8");;
   
   Object.keys(manifest).forEach(filename=>{
      html = html.replace(`{${filename}}`,manifest[filename])
   })

   keys.forEach((key) => {
      html = html.replace(`{${key}}`, view_data[key]);
   });



   if(process.env.NODE_ENV == 'development')
   {
      html = html.replace("</body>",`
      <script>
      var evtSource = new EventSource('http://localhost:8001/subscribe');

         evtSource.onmessage = function (event) { 
         if (event.data.includes("reload")) {
            console.log("reloaded")
            location.reload()
         }
      };
      </script>
      </body>
      `)
   }
   

   return html;
}

export default importFiles();
