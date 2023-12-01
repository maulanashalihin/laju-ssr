import { readFileSync, readdirSync, statSync } from "fs";
import * as Sqrl from "squirrelly";
const manifest = require("../../public/manifest.json");
import path from "path";

let html_files = {} as {
   [key: string]: string;
};

function importFiles(directory = "resources/views") {
   const files = readdirSync(directory);

   for (const filename of files) {
      const results = statSync(path.join(directory, filename));

      if (results.isDirectory()) {
         importFiles(path.join(directory, filename)); // recursive call to get all files
      } else {
         const html = readFileSync(path.join(directory, filename), "utf8");

         if (directory == "resources/views/partials") {
            Sqrl.templates.define(filename, Sqrl.compile(html));
         }

         html_files[directory + "/" + filename] = html;
      }
   }
}
export function view(filename: string, view_data?: any) {
   let directory = "resources/views";

   const keys = Object.keys(view_data || {});

   let html;

   if (process.env.NODE_ENV == "development") {
      importFiles("resources/views/partials");
      html = readFileSync(path.join(directory, filename), "utf8");
   } else {
      html = html_files[directory + "/" + filename];
   }

   html = Sqrl.render(html, {
      ...view_data,
      ...manifest,
   });

   if (process.env.NODE_ENV == "development") {
      html = html.replace(
         "</head>",
         `
      <script>
      var evtSource = new EventSource('http://localhost:8001/subscribe');

         evtSource.onmessage = function (event) { 
         if (event.data.includes("reload")) {
            console.log("reloaded")
            location.reload()
         }
      };
      </script>
      </head>
      `
      );
   }

   return html;
}

export default importFiles();
