/* generated by Svelte v4.2.5 */
import { create_ssr_component, escape } from "svelte/internal";

const Component = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	let { name = 'world' } = $$props;
	if ($$props.name === void 0 && $$bindings.name && name !== void 0) $$bindings.name(name);
	return `<div>halo ${escape(name)}!</div>`;
});

export default Component;