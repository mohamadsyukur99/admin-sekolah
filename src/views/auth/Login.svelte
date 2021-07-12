<script>
	import { link, navigate } from 'svelte-routing';
  import { Login  } from './../../api/auth/login'
  
  
  let isAlert = false
  let pesan = "";
  let statusButton = 0;
  let data = {
    username : "",
    password : ""
  }

  const ErrorMsg = (msg, kode) =>{
    statusButton = 1;
    switch (kode) {
      case "01":
        isAlert = true
        pesan = msg  
        break;
      case "02":
        isAlert = true
        pesan = msg  
        break;
      default:
        isAlert = true
        pesan = "Error server"
        break;
    }
  }

  const handleLogin = () =>{
    statusButton = 1;
    if (data.username == ""){
      isAlert = true
      pesan = "Email Tidak boleh koosng"
      statusButton = 0;
      return 
    }else if(data.password == ""){
      isAlert = true
      pesan = "Password Tidak boleh koosng"
      statusButton = 0;
      return
    }
    let kode = '';
    let msg = '';
    Login(data).then(res =>{
      kode = res.response.code;
      msg = res.response.message;
      data = res.response;
      if (kode != "00"){
        ErrorMsg(msg,kode)
      }else{
        localStorage.setItem("isLogin", 1);
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        navigate("/admin/dashboard", { replace: true });
      }
      statusButton=0
    })
  }
  export let location;
</script>

<div class="container mx-auto px-4 h-full">
  <div class="flex content-center items-center justify-center h-full">
    <div class="w-full lg:w-4/12 px-4">
      {#if isAlert == true}
      <div class="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500">
        <span class="text-xl inline-block mr-5 align-middle">
          <i class="fas fa-bell"></i>
        </span>
        <span class="inline-block align-middle mr-8">
          <b class="capitalize">{pesan}</b>
        </span>
        <button on:click="{(() => {isAlert = false})}" class="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none">
          <span>×</span>
        </button>
      </div>
      {/if}
      <div
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
      >
        <div class="rounded-t mb-0 px-6 py-6">
          <div class="text-center mb-3">
            <h6 class="text-blueGray-500 text-sm font-bold">
              Sign in
            </h6>
          </div>
          <hr class="mt-6 border-b-1 border-blueGray-300" />
        </div>
        <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
          <form>
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="grid-email"
              >
                Username
              </label>
              <input
                id="grid-email"
                type="email"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Username"
                bind:value="{data.username}"
              />
            </div>

            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="grid-password"
              >
                Password
              </label>
              <input
                id="grid-password"
                type="password"
                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                placeholder="Password"
                bind:value="{data.password}"
              />
            </div>
            <div>
              <label class="inline-flex items-center cursor-pointer">
                <input
                  id="customCheckLogin"
                  type="checkbox"
                  class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                />
                <span class="ml-2 text-sm font-semibold text-blueGray-600">
                  Remember me
                </span>
              </label>
            </div>
            
            <div class="text-center mt-6">
              {#if statusButton == 0}
              <button
                class="bg-blueGray-800  text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                type="button"
                on:click="{handleLogin}"
              >
                Sign In
              </button>
              {:else}
              <button
                disabled
                class="bg-blueGray-600  text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                type="button"
                on:click="{handleLogin}"
              >
                Sign In
              </button>
              {/if}
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
