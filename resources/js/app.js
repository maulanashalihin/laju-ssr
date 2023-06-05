import { createInertiaApp } from '@inertiajs/svelte'


createInertiaApp({
  resolve: name => require(`./Pages/${name}.svelte`),
  setup({ el, App, props }) {
    new App({ target: el, props })
  },
})

console.log("yes")

console.log("hebat")
console.log("hebat")