<script>
	import { onMount } from 'svelte';
  import { getUsers,getUsersByName,postUsers,getUsersById,putUsers,deleteUsers } from './../../api/users/users'
  // core components
  import CardUser from "components/Cards/CardUser.svelte";
  import CardFormUser from "components/Cards/CardFormUser.svelte";
  import ModalExpired from "components/modals/Expired.svelte"
  import ModalInformation from "components/modals/Information.svelte"
  import Filter from "components/Filter/Filter.svelte"
  import Alert from "components/Alert/Alert.svelte"
  import Title from "components/Navbars/Title.svelte"

  let isLogin = localStorage.getItem('isLogin');
  let data = [];
  let dataSimpan = [];
  let dataUpdate= [];
  let dataFilter;
  let idUser;
  let isForm = 0;
  let isAlert = 0;
  let isHapus = 0;
  let pesanAlert = "";
  let judulAlert = "";
  let namaUser = "";


  const getAllUsers = () =>{
    getUsers().then(res => {
      if (res == '401'){
        isLogin = 0
      }else{
        data = res.response
      }
    })
    dataUpdate=[]
  }


  const handleFilter = (event) => {
    data = [];
    dataFilter = event.detail.key
    if (dataFilter == ""){
      getAllUsers()
    }else{
      getUsersByName(dataFilter).then(res => {
      if (res == '401'){
        isLogin = 0
      }else{
        data = res.response
      }
    });
    } 
  }

  const CloseAlert = (event) =>{
    isAlert=event.detail.key
  }

  const handleBatal = (event) => {
    isForm = event.detail.key
    dataUpdate = []
  }

  const formEdit = (event) => {
    idUser      = event.detail.key
    isAlert=0
    getUsersById(idUser).then(res => {
      if (res == '401'){
        isLogin = 0
      }else{
        dataUpdate = res.response
        isForm=1
      }
    })
  }

  const formTambah = (event) => {
    isForm = event.detail.key
    isAlert=0
  }

  const handleSimpan = (event) => {
    dataSimpan = event.detail.key
    console.log(dataSimpan)
    postUsers(JSON.stringify(dataSimpan)).then(res =>{
      if (res.response != undefined){
        isForm = 0;
        judulAlert= "Information"
        pesanAlert= "Data berhasil ditambah"
        isAlert=1
        getAllUsers()
      }
    })
  }

  const handleUpdate = (event) => {
    dataUpdate = event.detail.key
    putUsers(JSON.stringify(dataUpdate),idUser).then(res =>{
      if (res.response != undefined){
        isForm = 0;
        isAlert=1
        judulAlert= "Information"
        pesanAlert= "Data berhasil diubah"
        getAllUsers()
      }
    })
  }

  const handleHapus = (event) =>{
    isHapus = 0
    deleteUsers(idUser).then(res =>{
      if (res.response != undefined){
        isAlert=1
        judulAlert= "Information"
        pesanAlert= "Data berhasil dihapus"
        getAllUsers()
      }
    })
  }
  const handleBatalHapus = (event) =>{
    isHapus =event.detail.key
  }
  const konfirHapus = (event) =>{
    idUser = event.detail.key
    let dataHapus = []
    isHapus = 1
    getUsersById(idUser).then(res => {
      if (res == '401'){
        isLogin = 0
      }else{
        dataHapus = res.response
        namaUser = dataHapus.name
      }
    })
  }

  onMount(async () => {
		const res = await getUsers()
    if (res == '401'){
      isLogin = 0
    }else{
      data = res.response
    }
	});

  export let location;
</script>


{#if isLogin != 1}
<ModalExpired/>
{/if}
{#if isHapus == 1}
  <ModalInformation 
    judul ="Konfirmasi" 
    pesan="Apakah Anda Yakin User {namaUser} Ingin Dihapus?" 
    on:onHapus={handleHapus}
    on:onBatal={handleBatalHapus}
  />
{/if}

<Title judul="Halaman User" desc="Halaman Informasi Data User"/>
<div class="flex flex-wrap mt-3">
  <div class="w-full mb-12 px-2">
    {#if isAlert ==1}
      <Alert title="{judulAlert}" msg="{pesanAlert}" color="emerald-500" on:Close={CloseAlert}/>
    {/if}
    {#if isForm == 0}
    <Filter 
      on:filter={handleFilter} 
      label="Nama / Username" 
      placeholder = "Masukan Nama / Username"
    />
    <CardUser 
      data={data} 
      on:onEdit={formEdit}
      on:onTambah={formTambah}
      on:onHapus={konfirHapus}
    /> 
    {:else}
      <CardFormUser 
        on:onBatal={handleBatal}
        on:onSimpan={handleSimpan}
        on:onUpdate={handleUpdate}
        dataUpdate = {dataUpdate}
      />
    {/if}
  </div>
</div>
