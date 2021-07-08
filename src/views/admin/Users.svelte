<script>
  // core components
  import CardTable from "components/Cards/CardTable.svelte";
  import ModalExpired from "components/modals/Expired.svelte"


  let isLogin = localStorage.getItem('isLogin');

  export let location;
</script>
{#if isLogin != 1}
  <ModalExpired/>
{/if}
<div class="flex flex-wrap mt-4">
  <div class="w-full mb-12 px-4">
    <div
      class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
    >
      <div class="rounded-t bg-white mb-0 px-4 py-4">
        <div class="text-center flex justify-between">
          <div>
            <h6 class="text-blueGray-700 text-xl font-bold">My account</h6>
            <p>filter untuk data user</p>
          </div>
          <button
            class="bg-red-400 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
            type="button"
          >
            Settings
          </button>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        <form>
          <!-- <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            User Information
          </h6> -->
          <div class="flex flex-wrap mt-3">
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-username"
                >
                  Username
                </label>
                <input
                  id="grid-username"
                  type="text"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value="lucky.jesse"
                />
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-email"
                >
                  Email address
                </label>
                <input
                  id="grid-email"
                  type="email"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value="jesse@example.com"
                />
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-first-name"
                >
                  First Name
                </label>
                <input
                  id="grid-first-name"
                  type="text"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value="Lucky"
                />
              </div>
            </div>
            <div class="w-full lg:w-6/12 px-4">
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-last-name"
                >
                  Last Name
                </label>
                <input
                  id="grid-last-name"
                  type="text"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  value="Jesse"
                />
              </div>
            </div>
          </div>
          <div class="text-center flex justify-between">
            <!-- <h6 class="text-blueGray-700 text-xl font-bold">My account</h6> -->
            <div></div>
            <div class="mr-3 pt-6 pb-0">
              <button
                class="bg-red-400 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
              >
                Filter
              </button>
              <button
                class="bg-red-400 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <CardTable />
  </div>
</div>
