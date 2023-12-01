<script>
   let menu = "draft";
</script>

<div>
   <div class="mt-5">
      <div class="border-b border-gray-200">
         <nav class="-mb-px flex gap-6" aria-label="Tabs">
            <button
               on:click={() => {
                  menu = "draft";
               }}
               class="shrink-0 px-1 pb-4 text-sm {menu == 'draft'
                  ? 'text-orange-600 border-b-2 border-orange-500'
                  : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'}"
            >
               Draft
            </button>

            <button
               on:click={() => {
                  menu = "in review";
               }}
               class="shrink-0 px-1 pb-4 text-sm {menu == 'in review'
                  ? 'text-orange-600 border-b-2 border-orange-500 '
                  : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'}"
            >
               In Review
            </button>
            <button
               on:click={() => {
                  menu = "published";
               }}
               class="shrink-0 px-1 pb-4 text-sm {menu == 'published'
                  ? 'text-orange-600 border-b-2 border-orange-500'
                  : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'}"
            >
               Published
            </button>

            <button
               on:click={() => {
                  menu = "rejected";
               }}
               class="shrink-0 px-1 pb-4 text-sm {menu == 'rejected'
                  ? 'text-orange-600 border-b-2 border-orange-500'
                  : 'text-gray-500 hover:border-gray-300 hover:text-gray-700'}"
            >
               Rejected
            </button>
         </nav>
      </div>
   </div>
   <div></div>
</div>
