// import { createInertiaApp } from '@inertiajs/svelte'


// createInertiaApp({
//   resolve: name => require(`./Pages/${name}.svelte`),
//   setup({ el, App, props }) {
//     new App({ target: el, props })
//   },
// })

// import "./index.css" 

import Editor from "./Components/Editor.svelte"
import ListPost from "./Components/ListPost.svelte"

window.Editor = Editor
window.ListPost = ListPost

