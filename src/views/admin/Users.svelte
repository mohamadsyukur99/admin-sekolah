<script>
	import { onMount } from 'svelte';
  import { getUsers,getUsersByName,postUsers } from './../../api/users/users'
  // core components
  import CardUser from "components/Cards/CardUser.svelte";
  import CardFormUser from "components/Cards/CardFormUser.svelte";
  import ModalExpired from "components/modals/Expired.svelte"
  import Filter from "components/Filter/Filter.svelte"
  import Alert from "components/Alert/Alert.svelte"
  import Title from "components/Navbars/Title.svelte"

  let isLogin = localStorage.getItem('isLogin');
  let data = [];
  let dataSimpan = [];
  let dataFilter;
  let idUser;
  let isForm = 0;
  let isAlert = 0;

  // Default options
  const options = {
    duration: 4000,       // duration of progress bar tween
    dismissable: true,    // allow dismiss with close button
    initial: 1,           // initial progress bar value
    progress: 0,          // current progress
    reversed: false,      // insert new toast to bottom of stack
    intro: { x: 256 },    // toast intro fly animation settings
    theme: {}             // css var overrides
  }

  const getAllUsers = () =>{
    getUsers().then(res => {
        if (res == '401'){
          isLogin = 0
        }else{
          data = res.response
        }
      })
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
  }

  const formEdit = (event) => {
    idUser = event.detail.key
  }

  const formTambah = (event) => {
    isForm = event.detail.key
  }

  const handleSimpan = (event) => {
    dataSimpan = event.detail.key
    postUsers(JSON.stringify(dataSimpan)).then(res =>{
      if (res.response != undefined){
        isForm = 0;
        isAlert=1
        getAllUsers()
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
<Title judul="Halaman User" desc="Halaman Informasi Data User"/>
<div class="flex flex-wrap mt-3">
  <div class="w-full mb-12 px-2">
    {#if isAlert ==1}
      <Alert title="Information" msg="Data berhasil ditambah" color="emerald-500" on:Close={CloseAlert}/>
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
    /> 
    {:else}
      <CardFormUser 
        on:onBatal={handleBatal}
        on:onSimpan={handleSimpan}
      />
    {/if}
  </div>
</div>
