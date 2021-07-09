<script>
    export let judul ="judul"
    export let desc = "Deskripsi"
</script>

<div class="lg:flex lg:items-center lg:justify-between mb-8 ml-2">
    <div class="flex-1 min-w-0">
        <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            {judul}
        </h2>
        <div class="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
            <div class="mt-2 flex items-center text-sm text-gray-500">
                {desc}
            </div>
        </div>
    </div>
</div>