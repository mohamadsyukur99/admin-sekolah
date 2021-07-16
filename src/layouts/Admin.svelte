<script>
  import { Router, Route } from "svelte-routing";

  // components for this layout
  import AdminNavbar from "components/Navbars/AdminNavbar.svelte";
  import Sidebar from "components/Sidebar/Sidebar.svelte";
  import FooterAdmin from "components/Footers/FooterAdmin.svelte";

  // pages for this layout
  import Dashboard from "views/admin/Dashboard.svelte";
  import Settings from "views/admin/Settings.svelte";
  import Users from "views/admin/Users.svelte";
  import Siswa from "views/admin/Siswa.svelte";

  export let location;
  export let admin = "";


  let isLogin = localStorage.getItem('isLogin');
  if(isLogin == 0){
    
  }
</script>

<div>
  <Sidebar location={location}/>
  <div class="relative md:ml-64 bg-blueGray-100">
    <AdminNavbar />
    <div class="px-4 md:px-10 mx-auto w-full pt-4"> 
      <Router url="admin">
        <Route path="dashboard" component="{Dashboard}" />
        <Route path="settings" component="{Settings}" />
        <Route path="users" component="{Users}" />
        <Route path="siswa" component="{Siswa}" />
      </Router>
      <FooterAdmin />
    </div>
  </div>
</div>
