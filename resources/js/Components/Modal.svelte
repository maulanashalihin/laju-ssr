<script>
    export let show = false;
    export let title = "Modal"
    export let width = "max-w-2xl"
    import { fly,fade } from 'svelte/transition'

    // const modal_overlay = document.querySelector('');


    

</script>
  
  {#if show}
  <div
    class="z-50 fixed inset-0    overflow-y-auto overflow-x-hidden bg-gray-900 bg-opacity-75 p-4 lg:p-8"
    tabindex="-1"
    transition:fade 
  >


 
  <div   transition:fly={{ y: 100 }} on:introstart on:outroend class="relative bg-white mx-auto  {width}    rounded-lg shadow  ">
        
    <div class="flex justify-between items-start p-4 rounded-t border-b  ">
        <h3 class="text-xl font-semibold text-gray-900  ">
            {title}
        </h3>
        <button on:click="{()=>{show = false;}}" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  " data-modal-toggle="defaultModal">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Close modal</span>
        </button>
    </div>
    <slot></slot>
</div>

  </div>
  {/if}
  <!-- END Modal Backdrop -->