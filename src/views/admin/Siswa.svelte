<svelte:head>
	<title>Halaman Siswa</title>
</svelte:head>
<script>
	import { onMount } from 'svelte';
  import S from './../../api/siswa/siswa'
  // core components
  import CardSiswa from "components/Cards/CardSiswa.svelte";
  import CardFormSiswa from "components/Cards/CardFormSiswa.svelte";
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
  let idSiswa;
  let isForm = 0;
  let isAlert = 0;
  let isHapus = 0;
  let pesanAlert = "";
  let judulAlert = "";
  let namaSiswa = "";


  const getAllSiswa = () =>{
    S.getSiswa().then(res => {
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
      getAllSiswa()
    }else{
      S.getSiswaByName(dataFilter).then(res => {
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
    idSiswa      = event.detail.key

    isAlert=0
    S.getUSiswaById(idSiswa).then(res => {
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
    S.postSiswa(JSON.stringify(dataSimpan)).then(res =>{
      if (res.response != undefined){
        isForm = 0;
        judulAlert= "Information"
        pesanAlert= "Data berhasil ditambah"
        isAlert=1
        getAllSiswa()
      }
    })
  }

  const handleUpdate = (event) => {
    dataUpdate = event.detail.key
    S.putSiswa(JSON.stringify(dataUpdate),idSiswa).then(res =>{
      if (res.response != undefined){
        isForm = 0;
        isAlert=1
        judulAlert= "Information"
        pesanAlert= "Data berhasil diubah"
        getAllSiswa()
      }
    })
  }

  const handleHapus = (event) =>{
    isHapus = 0
    S.deleteSiswa(idSiswa).then(res =>{
      if (res.response != undefined){
        isAlert=1
        judulAlert= "Information"
        pesanAlert= "Data berhasil dihapus"
        getAllSiswa()
      }
    })
  }
  const handleBatalHapus = (event) =>{
    isHapus =event.detail.key
  }
  const konfirHapus = (event) =>{
    idSiswa = event.detail.key
    let dataHapus = []
    isHapus = 1
    S.getUSiswaById(idSiswa).then(res => {
      if (res == '401'){
        isLogin = 0
      }else{
        dataHapus = res.response
        namaSiswa = dataHapus.nama
      }
    })
  }

  onMount(async () => {
		const res = await S.getSiswa()
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
    pesan="Apakah Anda Yakin Siswa {namaSiswa} Ingin Dihapus?" 
    on:onHapus={handleHapus}
    on:onBatal={handleBatalHapus}
  />
{/if}

<Title judul="Halaman Siswa" desc="Halaman Informasi Data Siswa"/>
<div class="flex flex-wrap mt-3">
  <div class="w-full mb-12 px-2">
    {#if isAlert ==1}
      <Alert title="{judulAlert}" msg="{pesanAlert}" color="emerald-500" on:Close={CloseAlert}/>
    {/if}
    {#if isForm == 0}
    <Filter 
      on:filter={handleFilter} 
      judul="Filter Data Siswa"
      label="Nama / No Induk" 
      placeholder = "Masukan Nama / No Induk"
    />
    <CardSiswa 
      data={data} 
      on:onEdit={formEdit}
      on:onTambah={formTambah}
      on:onHapus={konfirHapus}
    /> 
    {:else}
      <CardFormSiswa 
        on:onBatal={handleBatal}
        on:onSimpan={handleSimpan}
        on:onUpdate={handleUpdate}
        dataUpdate = {dataUpdate}
      />
    {/if}
  </div>
</div>
