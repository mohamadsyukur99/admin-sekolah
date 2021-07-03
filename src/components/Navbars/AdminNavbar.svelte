<script>
  // core components
  import UserDropdown from "components/Dropdowns/UserDropdown.svelte";
</script>

<!-- Navbar -->
<nav
  class="top-0 left-0 w-full z-10 bg-transparent  md:flex-row md:flex-nowrap md:justify-start flex items-center mb-12"
>
  <div
    class="w-full mx-autp bg-white border-b-2 border-opacity-25  items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 p-2"
  >
    <!-- Brand -->
    <a
      class="text-black text-sm uppercase hidden lg:inline-block font-semibold"
      href="#pablo" on:click={(e) => e.preventDefault()}
    >
      Dashboard
    </a>
    <!-- User -->
    <ul class="flex-col md:flex-row list-none items-center hidden md:flex">
      <UserDropdown />
    </ul>
  </div>
</nav>
<!-- <nav class="bg-white rounded font-sans w-full py-2 pl-10 mb-12">
  <ol class="list-reset flex text-grey-dark">
    <li><a href="#" class="font-reguler">Home</a></li>
    <li><span class="mx-2">></span></li>
    <li><a href="#" class="font-reguler">Library</a></li>
    <li><span class="mx-2">></span></li>
    <li>Data</li>
  </ol>
</nav> -->
<!-- End Navbar -->
