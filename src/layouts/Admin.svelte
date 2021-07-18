<script>
  import { Router, Route } from "svelte-routing";
  import { onMount } from 'svelte';
  import Auth from './../api/auth/login'

  // components for this layout
  import AdminNavbar from "components/Navbars/AdminNavbar.svelte";
  import Sidebar from "components/Sidebar/Sidebar.svelte";
  import FooterAdmin from "components/Footers/FooterAdmin.svelte";
  import ModalExpired from "components/modals/Expired.svelte"

  // pages for this layout
  import Dashboard from "views/admin/Dashboard.svelte";
  import Settings from "views/admin/Settings.svelte";
  import Users from "views/admin/Users.svelte";
  import Siswa from "views/admin/Siswa.svelte";
  import Guru from "views/admin/Guru.svelte";

  let isLogin = localStorage.getItem('isLogin');
  export let location;
  export let admin = "";

  const CekStatus = () =>{
    Auth.CekStatus().then(res => {
      if (res == '401'){
        isLogin = 0
      }else{
        console.log("oke")
      }
    })
  }

  onMount(async () => {
		 await CekStatus()
	});

</script>

<div>
  <Sidebar location={location}/>
  <div class="relative md:ml-64 bg-blueGray-100">
    <AdminNavbar />
    <div class="px-4 md:px-10 mx-auto w-full pt-4"> 
      <Router url="admin">
        {#if isLogin != 1}
          <ModalExpired/>
        {/if}
        <Route path="dashboard" component="{Dashboard}" />
        <Route path="settings" component="{Settings}" />
        <Route path="users" component="{Users}" />
        <Route path="siswa" component="{Siswa}" />
        <Route path="guru" component="{Guru}" />
      </Router>
      <FooterAdmin />
    </div>
  </div>
</div>
