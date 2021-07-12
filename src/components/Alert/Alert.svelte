<script>
    import {createEventDispatcher} from 'svelte'

    const dispatch = createEventDispatcher();   

    const onClose = () =>{
        let id=0
        dispatch('Close',{
            key:id
        });
    }

    export let title;
    export let msg="This is a orange alert - check it out!";
    export let color="emerald-500"
</script>

<div class="text-white px-6 py-4 border-0 rounded relative mb-0 bg-{color}">
    <span class="text-xl inline-block mr-5 align-middle">
      <i class="fas fa-bell"></i>
    </span>
    <span class="inline-block align-middle mr-8">
      <b class="capitalize">{title}!</b> {msg}
    </span>
    <button  class="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none">
      <span on:click="{onClose}">×</span>
    </button>
  </div>