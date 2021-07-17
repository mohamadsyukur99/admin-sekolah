<script>
  import { Router, Route } from "svelte-routing";

  // components for this layout
  import AuthNavbar from "components/Navbars/AuthNavbar.svelte";
  import FooterSmall from "components/Footers/FooterSmall.svelte";

  // pages for this layout
  import Login from "views/auth/Login.svelte";
  import Register from "views/auth/Register.svelte";
  import { link, navigate } from 'svelte-routing';

  const gambar = "../assets/img/gambar-01-min-min.jpg";
  export let location;
  export let auth = "";

  let isLogin = localStorage.getItem('isLogin');
  if (isLogin == 1){
    navigate("/admin/dashboard", { replace: true });
  }
</script>

<div>
  <main>
    <section class="relative w-full h-full py-40 min-h-screen">
      <div
        class="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
        style="background-image: url({gambar});"
      ></div>
      <Router url="auth">
        <Route path="login" component="{Login}" />
        <Route path="register" component="{Register}" />
      </Router>
      <FooterSmall absolute="true" />
    </section>
  </main>
</div>
