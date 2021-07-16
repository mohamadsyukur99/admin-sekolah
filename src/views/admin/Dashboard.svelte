<svelte:head>
	<title>Dashboard</title>
</svelte:head>
<script>
  // core components
  import CardLineChart from "components/Cards/CardLineChart.svelte";
  import CardBarChart from "components/Cards/CardBarChart.svelte";
  import CardPageVisits from "components/Cards/CardPageVisits.svelte";
  import CardSocialTraffic from "components/Cards/CardSocialTraffic.svelte";
  import ModalExpired from "components/modals/Expired.svelte"
  import Title from "components/Navbars/Title.svelte"


  export let location;
  let isLogin = localStorage.getItem('isLogin');
</script>

<div>
  {#if isLogin != 1}
  <ModalExpired/>
  {/if}
  <!-- <Title judul="Dashboard" desc="Selamat Datang Di APlikasi Administrasi"/> -->
  <center>
    <div class="mt-2 mb-0  items-right text-lg text-gray-500">
        Selamat Datang Di Aplikasi Administrasi
    </div>
    <div class="mt-0 mb-8  items-right text-lg text-gray-500">
        SMA Negeri 1 Indinesia
    </div>
  </center>

  <div class="flex flex-wrap">
    <div class="w-full  mb-12 xl:mb-0 px-4">
      <CardLineChart />
    </div>
  </div>
</div>
