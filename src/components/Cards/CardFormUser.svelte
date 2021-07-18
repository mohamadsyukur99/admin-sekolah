<script>
  import {createEventDispatcher,onMount} from 'svelte'
  import { emailValidator, requiredValidator } from './../../validate/validators.js'
  import { createFieldValidator } from './../../validate/validation.js'
  import { getUsersByName } from './../../api/users/users'
  import Alert from "components/Alert/Alert.svelte"

  const [ validity, validate ] = createFieldValidator(requiredValidator(), emailValidator())
  let isLogin = localStorage.getItem('isLogin');
  let selecet;
  let readonly = ""
  let checkbox = true;
  let username = false;
  let isEdit = 0;
  let judul = "Tambah User"
  export let dataUpdate = []
  let data = {
    name:"",
    username:"",
    email:"",
    password:"",
    level:"",
    status:"1"
  }
  let msgError="";
  let alertOpen = 0;

  const dispatch = createEventDispatcher();
  const clearForm = () =>{
    data.name=""
    data.username=""
    data.email=""
    data.password=""
    data.level=""
  }  
  
  const handleClose = () =>{
    let id = 0
    clearForm();
    dispatch('onBatal',{
			key:id
		});
  }

  const validateUsername =()=>{
    getUsersByName(data.username).then(res => {
      if (res == '401'){
        isLogin = 0
      }else{
        // data = res.response
        if(res.response[0] != undefined){
          msgError = "Username Yang Anda Masukan Sudah Ada"
          alertOpen = 1
        }
      }
    })
  }

  const formValidation =()=>{
    if (data.name == ""){
      msgError = "Nama Tidak boleh koosng"
      alertOpen = 1
      return 
    }else if(data.username == ""){
      msgError = "Username Tidak boleh koosng"
      alertOpen = 1
      return
    }else if (data.email == ""){
      msgError = "Email Tidak boleh koosng"
      alertOpen = 1
      return 
    }else if($validity.dirty && !$validity.valid){
      msgError = $validity.message
      alertOpen = 1
      return
    }else if(data.password == "" && isEdit == 0){
      msgError = "Password Tidak boleh koosng"
      alertOpen = 1
      return
    }else if (data.password.length < 6 && isEdit == 0){
      msgError = "Password harus lebih dari 6 karakter"
      alertOpen = 1
      return
    }
    msgError=""
  }

  const CloseAlert = (event) =>{
    alertOpen=event.detail.key
  }

  const handleSimpan = () =>{
    formValidation()
    validateUsername()
    if(msgError != ""){
      return
    }
    alertOpen = 0
    data.level=selecet
    
    dispatch('onSimpan',{
      key:data
    });
    clearForm();
  }

  const handleUpdate = () =>{
    formValidation()
    if(msgError != ""){
      return
    }
    alertOpen = 0
    data.level=selecet
    
    dispatch('onUpdate',{
      key:data
    });
    clearForm();
  }

  onMount(async () => {
    if (dataUpdate.id != undefined){
      data.username = dataUpdate.username
      data.name=dataUpdate.name
      data.email=dataUpdate.email
      data.level=dataUpdate.level
      username = true
      checkbox = false;
      isEdit=1
      judul = "Ubah User"
    }
	});

</script>
<div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
    <div class="rounded-t bg-white mb-0 px-4 py-4 border-b">
      <div class="text-center flex justify-between">
        <h6 class="text-blueGray-700 text-xl font-bold">{judul}</h6>
        <button
          class="bg-red-400 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          type="button"
          on:click="{handleClose}"
        >
          Tutup
        </button>
      </div>
    </div>
    {#if alertOpen == 1}
      <Alert title="Peringatan" msg=" {msgError}" color="orange-500" on:Close={CloseAlert}/>
    {/if}
    <div class="flex-auto px-4 lg:px-10 py-10 pt-0 bg-white">
      <form>
        <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          User Information
        </h6>
        <div class="flex flex-wrap">
          <div class="w-full px-4">
            <div class="relative w-full mb-4">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Nama Lengkap
              </label>
              <input
                id="grid-first-name"
                type="text"
                placeholder="Nama Lengkap"
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                bind:value="{data.name}"
              />
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="grid-username"
              >
                Username
              </label>
              <input
                {readonly}
                id="grid-username"
                placeholder="Username"
                type="text"
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                bind:value="{data.username}"
                disabled={username}
              />
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="grid-username"
              >
                Password
              </label>
              <input
                id="grid-password"
                placeholder="Password"
                type="password"
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                bind:value="{data.password}"
                disabled={!checkbox}
              />
              {#if isEdit ==1}
                <input bind:checked={checkbox} id="comments" name="comments" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded">
                <label for="" class="text-sm text-gray-500">
                    Chek untuk merubah password
                </label>
              {/if}
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
                placeholder="Email Address"
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                bind:value="{data.email}"
                use:validate={data.email}
              />
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="grid-email"
              >
                Level
              </label>
              <select 
                id="country" 
                name="country" 
                autocomplete="country" 
                class="mt-1 block w-full py-3 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                bind:value={selecet}
              >
                <option value="1">Admin</option>
                <option value="2">Editor</option>
              </select>
          </div>         
        </div>
        <div class="text-center flex justify-between">
          <div class="mr-0 pt-6 pb-0">
            {#if isEdit ==0}
              <button
                class="bg-lightBlue-600 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                on:click="{handleSimpan}"
              >
                Save
              </button>
            {:else}
            <button
                class="bg-lightBlue-600 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                on:click="{handleUpdate}"
              >
                Save
              </button>
            {/if}
            
            <button
              class="bg-red-600 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
              type="button"
              on:click="{handleClose}"
            >
              Batal
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>