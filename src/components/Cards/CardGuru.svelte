<script>
  // core components
  import TableDropdown from "components/Dropdowns/TableDropdown.svelte";
  import {createEventDispatcher} from 'svelte'
  import Utils from "../../utils/Utils"

  const dispatch = createEventDispatcher();

  // can be one of light or dark
  export let color = "light";
  export let data = [];

  const handleCLick = (id) =>{
    dispatch('onEdit',{
			key:id
		});
  }

  const handleTambah = () =>{
    let id = 1
    dispatch('onTambah',{
			key:id
		});
  }

  const handleHapus = (id) =>{
    dispatch('onHapus',{
			key:id
		});
    // console.log('tesss')
  }
  
  const jenis_kelamin = (kode) =>{
    switch (kode) {
      case "1":
        return "Laki - Laki"
      case "2":
        return "Perempuan"
      default:
        break;
    }
  }

  const agama = (kode) => {
    switch (kode) {
      case "1":
        return "Islam"    
      case "2":
        return "Protestan"    
      case "3":
        return "Katolik"    
      case "4":
        return "Hindu"    
      case "5":
        return "Budha"    
      case "6":
        return "Khonghucu"    
      default:
        break;
    }
  }
</script>

<div
  class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded {color === 'light' ? 'bg-white' : 'bg-red-800 text-white'}"
>
  <div class="rounded-t mb-0 px-4 py-3 border-0">
    <div class="flex flex-wrap items-center pr-2">
      <div class="relative w-full px-4 max-w-full flex-grow flex-1">
        <h3
          class="font-semibold text-lg {color === 'light' ? 'text-blueGray-700' : 'text-white'}"
        >
          Data Guru
        </h3>
      </div>
      <button
        class="ml-10 bg-lightBlue-600 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
        type="button"
        on:click="{handleTambah}"
      >
        Tambah
      </button>
    </div>
  </div>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-auto border-b border-t border-gray-200 sm:rounded-lg">
          <table class="w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nip
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jenis kelamin
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tempat Lahir
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal Lahir
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Alamat
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Agama
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each data as key}
              <tr on:dblclick="{handleCLick(key.id)}">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="text-sm font-medium text-gray-900">
                      {key.nip}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{key.nama}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{jenis_kelamin(key.jenis_kelamin)}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {key.tempat_lahir}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {Utils.FormatTanggal(key.tanggal_lahir,"DD-MM-YYYY")}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {key.alamat}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {agama(key.agama)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a on:click="{handleHapus(key.id)}" href="#h" class="text-indigo-600 hover:text-indigo-900">Hapus</a>
                </td>
                <!-- <td
                  class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
                >
                  <TableDropdown />
                </td> -->
              </tr>
              {/each}
              <!-- More people... -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>


