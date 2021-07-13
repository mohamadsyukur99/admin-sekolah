<script>
  // core components
  import TableDropdown from "components/Dropdowns/TableDropdown.svelte";
  import {createEventDispatcher} from 'svelte'

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
  
  const level = (kode) =>{
    switch (kode) {
      case "1":
        return "Admin"
      case "2":
        return "Editor"
      default:
        break;
    }
  }

  const status = (kode) => {
    switch (kode) {
      case "1":
        return "Aktif"
      case "-2":
        return "Tidak aktif"
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
          Data User
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
        <div class="shadow overflow-hidden border-b border-t border-gray-200 sm:rounded-lg">
          <table class="w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {#each data as user}
              <tr on:dblclick="{handleCLick(user.id)}">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="text-sm font-medium text-gray-900">
                      {user.name}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{user.username}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{user.email}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {level(user.level)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {status(user.status)}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a on:click="{handleHapus(user.id)}" href="#h" class="text-indigo-600 hover:text-indigo-900">Hapus</a>
                </td>
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


