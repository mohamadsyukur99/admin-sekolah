<script>
  import {createEventDispatcher} from 'svelte'

  export let judul;
  export let pesan;
  const dispatch = createEventDispatcher();

  const handleHapus = () =>{
    let id = 1
    dispatch('onHapus',{
			key:id
		});
  }

  const handleBatal = () =>{
    let id =0
    dispatch('onBatal',{
			key:id
		});
  }

</script>

<div class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
<div class="relative w-auto my-6 mx-auto max-w-sm">
  <!--content-->
  <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
    <!--header-->
    <div class="flex items-start justify-center p-3 border-b border-solid border-blueGray-200 rounded-t">
      <h3 class="text-3xl font-semibold text-center">
        {judul}
      </h3>
      <button class="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
        <span class="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
          ×
        </span>
      </button>
    </div>
    <!--body-->
    <div class="relative p-6 flex-auto">
      <p class="my-4 text-blueGray-500 text-lg leading-relaxed">
        {pesan}
      </p>
    </div>
    <!--footer-->
    <div class="bg-blueGray-100 flex items-center justify-center p-3 border-t border-solid border-blueGray-200 rounded-b">
      <button on:click="{handleHapus}" type="button" class="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-lightBlue-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
        Hapus
      </button>
      <button on:click="{handleBatal}" type="button" class="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
        Batal
      </button>
    </div>
  </div>
</div>
</div>
<div class="opacity-25 fixed inset-0 z-40 bg-black"></div>

