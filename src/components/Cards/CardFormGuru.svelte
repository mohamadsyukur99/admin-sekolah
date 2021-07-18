<script>
  import {createEventDispatcher,onMount} from 'svelte'
  import { emailValidator, requiredValidator } from './../../validate/validators.js'
  import { createFieldValidator } from './../../validate/validation.js'
  import G from './../../api/guru/guru'
  import Alert from "components/Alert/Alert.svelte"

  const [ validity, validate ] = createFieldValidator(requiredValidator(), emailValidator())
  const dispatch = createEventDispatcher();

  let isLogin = localStorage.getItem('isLogin');
  let selecet;
  let selected;
  let readonly = ""
  let checkbox = true;
  let nip = false;
  let isEdit = 0; 
  let judul = "Tambah Guru"
  let tgl="";
  let bln="";
  let thn="";
  let tanggal_lahir_asli="";
  tanggal_lahir_asli = thn+"-"+bln+"-"+tgl;
  export let dataUpdate = []
  let data = {
    nip: "",
    nama: "",
    jenis_kelamin: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    alamat: "",
    status: "1"
  }
  let msgError="";
  let alertOpen = 0;

  const clearForm = () =>{
    data.nip= "",
    data.nama= "",
    data.jenis_kelamin= "",
    data.tempat_lahir= "",
    tgl= "",
    thn= "",
    bln= "",
    data.alamat= "",
    data.status= "1"
    data.agama= ""
  }  
  
  const handleClose = () =>{
    let id = 0
    clearForm();
    dispatch('onBatal',{
			key:id
		});
  }

  const validateNoInduk =()=>{
    G.getGuruNip(data.nip).then(res => {
      if (res == '401'){
        isLogin = 0
      }else{
        if(res.response[0] != undefined){
          msgError = "No Induk Yang Anda Masukan Sudah Terdaftar"
          alertOpen = 1
        }
      }
    })
  }

  const formValidation =()=>{
    if (data.nip == ""){
      msgError = "No Induk Tidak boleh koosng"
      alertOpen = 1
      return 
    }else if(data.nama == ""){
      msgError = "Nama Tidak boleh koosng"
      alertOpen = 1
      return
    }else if (data.jenis_kelamin == ""){
      msgError = "Jenis Kelamin Tidak boleh koosng"
      alertOpen = 1
      return 
    }else if(data.tempat_lahir == ""){
      msgError = "Password Tidak boleh koosng"
      alertOpen = 1
      return
    }else if(tgl == ""){
      msgError = "Tanggal Tidak boleh koosng"
      alertOpen = 1
      return
    }else if (tgl.length != 2 && tgl > 31){
      msgError = "Tanggal Tidak Valid"
      alertOpen = 1
      return
    }else if(bln == ""){
      msgError = "Bulan Tidak boleh koosng"
      alertOpen = 1
      return
    }else if(thn == ""){
      msgError = "Tahun Tidak boleh koosng"
      alertOpen = 1
      return
    }else if(thn.length != 4){
      msgError = "Tahun Tidak Valid"
      alertOpen = 1
      return
    }else if(data.alamat == ""){
      msgError = "Alamat Tidak boleh koosng"
      alertOpen = 1
      return
    }else if(data.agama == ""){
      msgError = "Agama Tidak boleh koosng"
      alertOpen = 1
      return
    }
    msgError=""
  }

  const CloseAlert = (event) =>{
    alertOpen=event.detail.key
  }

  const handleSimpan = () =>{
    data.tanggal_lahir = thn+"-"+bln+"-"+tgl;

    formValidation()
    validateNoInduk()
    if(msgError != ""){
      return
    }
    alertOpen = 0
    
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
    let tgl_asli="";
    if (dataUpdate.id != undefined){
      data.nip = dataUpdate.nip
      data.nama=dataUpdate.nama
      data.jenis_kelamin=dataUpdate.jenis_kelamin
      data.tempat_lahir=dataUpdate.tempat_lahir
      data.alamat=dataUpdate.alamat
      data.agama=dataUpdate.agama
      tgl_asli=dataUpdate.tanggal_lahir
      thn=tgl_asli.substring(0,4)
      bln=tgl_asli.substring(5,7)
      tgl=tgl_asli.substring(8,10)
      nip = true
      isEdit=1
      judul = "Ubah Data Guru"
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
          Data Information
        </h6>
        <div class="flex flex-wrap">
          <!-- <div class="w-full px-4">
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
          </div> -->
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="grid-username"
              >
                Nip
              </label>
              <input
                {readonly}
                id="grid-username"
                placeholder="Nip"
                type="text"
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                bind:value="{data.nip}"
                disabled={nip}
              />
            </div>
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="grid-username"
              >
                Nama Lengkap
              </label>
              <input
                id="grid-username"
                placeholder="Nama Lengkap"
                type="text"
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                bind:value="{data.nama}"
              />
            </div>
          </div>          
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="grid-email"
              >
                Jenis Kelamin
              </label>
              <select 
                id="country" 
                name="country" 
                autocomplete="country" 
                class="mt-1 block w-full py-3 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                bind:value={data.jenis_kelamin}
              >
                <option value="">Jenis Kelamin</option>
                <option value="1">Laki - Laki</option>
                <option value="2">Perempuan</option>
              </select>
            </div>
          </div>  
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="grid-username"
              >
                Tempat Lahir
              </label>
              <input
                id="grid-username"
                placeholder="Tempat Lahir"
                type="text"
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                bind:value="{data.tempat_lahir}"
              />
            </div>
          </div>      
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="grid-username"
              >
                Tanggal Lahir
              </label>
              <div class="w-full   flex">
                <div class="relative w-full mb-2">
                  <input
                    id="grid-username"
                    placeholder="Tanggal"
                    type="text"
                    class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                    bind:value="{tgl}"
                  />
                </div>
                <div class="relative w-full mb-2">
                  <select 
                    id="country" 
                    name="country" 
                    autocomplete="country" 
                    class="block w-full py-3 px-3 border border-gray-300 bg-white rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    bind:value={bln}
                  >
                    <option value="">Bulan Lahir</option>
                    <option value="01">Januari</option>
                    <option value="02">Februari</option>
                    <option value="03">Maret</option>
                    <option value="04">April</option>
                    <option value="05">Mei</option>
                    <option value="06">Juni</option>
                    <option value="07">Juli</option>
                    <option value="08">Agustus</option>
                    <option value="09">September</option>
                    <option value="10">Oktober</option>
                    <option value="11">November</option>
                    <option value="12">Desemver</option>
                  </select>
                </div>
                <div class="relative w-full mb-2">
                  <input
                    id="grid-username"
                    placeholder="Tahun"
                    type="text"
                    class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                    bind:value="{thn}"
                  />
                </div>
              </div>
            </div>
          </div>    
          <div class="w-full lg:w-6/12 px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="grid-email"
              >
                Agama
              </label>
              <select 
                id="country" 
                name="country" 
                autocomplete="country" 
                class="mt-1 block w-full py-3 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                bind:value={data.agama}
              >
                <option value="">Agama</option>
                <option value="1">Islam</option>
                <option value="2">Protestan</option>
                <option value="3">Katolik</option>
                <option value="4">Hindu</option>
                <option value="5">Budha</option>
                <option value="6">Khonghucu</option>
              </select>
            </div>
          </div>  
          <div class="w-full px-4">
            <div class="relative w-full mb-3">
              <label
                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                for="grid-username"
              >
                Alamat
              </label>
              <input
                id="grid-username"
                placeholder="Alamat"
                type="text"
                class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border border-blueGray-300 outline-none focus:outline-none focus:shadow-outline w-full"
                bind:value="{data.alamat}"
              />
            </div>
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