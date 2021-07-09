<script>
  // core components
  import CardTable from "components/Cards/CardTable.svelte";
  import ModalExpired from "components/modals/Expired.svelte"
  import Filter from "components/Filter/Filter.svelte"
  import Title from "components/Navbars/Title.svelte"


  let isLogin = localStorage.getItem('isLogin');

  export let location;
</script>


{#if isLogin != 1}
  <ModalExpired/>
{/if}
<Title judul="Halaman User" desc="Halaman Informasi Data User"/>
<div class="flex flex-wrap mt-3">
  <div class="w-full mb-12 px-2">
    <Filter />
    <CardTable />
  </div>
</div>
