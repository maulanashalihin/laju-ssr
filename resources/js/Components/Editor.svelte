<script>
   import { onMount } from "svelte";
   import SaveAndSetting from "./SaveAndSetting.svelte";

   onMount(() => {
     
     
   
         DecoupledEditor.create(document.querySelector(".editor"), {
            // Editor configuration.
         })
            .then((editor) => {
               console.log("berhasil")
               window.editor = editor;
               // window.editor = editor;

               // Set a custom container for the toolbar.
               document
                  .querySelector(".document-editor__toolbar")
                  .appendChild(editor.ui.view.toolbar.element);
               document
                  .querySelector(".ck-toolbar")
                  .classList.add("ck-reset_all");
            })
            .catch(handleSampleError);

      function handleSampleError(error) {
        
      }
   });
</script>

<div>
   <header class="px-3 py-2 flex justify-between">
      <div class="flex items-center gap-1">
         <a href="/"
            ><svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               stroke-width="1.5"
               stroke="currentColor"
               class="w-6 h-6"
            >
               <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
               />
            </svg>
         </a>
         <input
            class="text-xl px-1 w-96 max-w-full"
            value="Judul Artikel ditulis disini"
         />
      </div>
      <SaveAndSetting />
   </header>

   <div class="centered">
      <div class="row">
         <div class="document-editor__toolbar"></div>
      </div>
      <div class="row row-editor">
         <div class="editor-container">
            <div class="editor">
               <h2>Bilingual Personality Disorder</h2>
            </div>
         </div>
      </div>
   </div>
</div>
