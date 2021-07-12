<script>
  import {createEventDispatcher} from 'svelte'

  const dispatch = createEventDispatcher();
  export let label = "Label";
  export let placeholder = "Placeholder";
  let dataFilter = "";
  const filter = () =>{
    dispatch('filter',{
			key:dataFilter
		});
  }

  const reset = () =>{
    dataFilter = ""
  }

</script>


<div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
  >
  <div class="rounded-t bg-blueGray-600 mb-0 px-4 py-4 pl-10 pr-12">
    <div class="text-center flex justify-between">
      <div>
        <h6 class="text-white text-sm  font-bold uppercase">
          Filter Data User
        </h6>
      </div>
    </div>
  </div>
  <div class="bg-white flex-auto px-4 lg:px-6 py-4 pt-2">
    <form>
      <div class="flex flex-wrap mt-3">
        <div class="w-full lg:w-6/12 px-4">
          <div class="relative w-full mb-3">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              for="grid-username"
            >
              {label}
            </label>
            <input 
                type="text" 
                placeholder="{placeholder}" 
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                bind:value="{dataFilter}"
            />
          </div>
        </div>
      </div>
      <div class="text-center flex justify-between">
        <!-- <h6 class="text-blueGray-700 text-xl font-bold">My account</h6> -->
        <div></div>
        <div class="mr-0 pt-6 pb-0">
          <button 
            class="text-orange-500 bg-transparent border border-solid border-orange-500 hover:bg-orange-500 hover:text-white active:bg-orange-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" 
            type="button"
            on:click="{reset}"
          >
            Reset
          </button>
          <button
            class="bg-orange-400 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            type="button"
            on:click="{filter}"
          >
            Filter
          </button>
        </div>
      </div>
    </form>
  </div>
</div>