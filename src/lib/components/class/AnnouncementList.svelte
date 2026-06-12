<script lang="ts">
    import { Calendar } from 'lucide-svelte';

    interface Announcement {
        id: number | string;
        title: string;
        date: string | null;
        body: string;
    }

    let { announcements = [] as Announcement[] } = $props();
</script>

<div class="space-y-8">
    <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-yellow-50 rounded-xl border border-yellow-200 flex items-center justify-center text-lg">
            📢
        </div>
        <h2 class="text-xl font-black text-gray-900">Anuncios</h2>
    </div>

    <div class="space-y-4">
        {#each announcements as ann}
            <div class="bg-white rounded-2xl border border-gray-100 p-6 hover:border-yellow-200 transition-all duration-300">
                <div class="flex items-center justify-between mb-3">
                    <h3 class="font-bold text-gray-900">{ann.title}</h3>
                    <span class="flex items-center gap-1 text-xs text-gray-400">
                        <Calendar size={12} />
                        {ann.date ? new Date(ann.date).toLocaleDateString('es-MX', { month: 'short', day: 'numeric' }) : 'Sin fecha'}
                    </span>
                </div>
                <p class="text-gray-600 leading-relaxed text-sm">{ann.body}</p>
            </div>
        {:else}
            <div class="bg-white rounded-2xl border border-gray-100 p-10 text-center">
                <span class="text-4xl block mb-2 opacity-50">📭</span>
                <p class="text-gray-400 font-medium">No hay anuncios todavía</p>
            </div>
        {/each}
    </div>
</div>
