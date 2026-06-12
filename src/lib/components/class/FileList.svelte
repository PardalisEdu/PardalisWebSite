<script lang="ts">
    import { FileText, Download } from 'lucide-svelte';

    interface ClassFile {
        id?: string | number;
        name: string;
        size?: string;
        date: string | null;
        url: string | null;
    }

    let { files = [] as ClassFile[] } = $props();
</script>

<div class="bg-white rounded-2xl border border-gray-100 p-6 sticky top-28">
    <div class="flex items-center gap-3 mb-5">
        <div class="w-10 h-10 bg-blue-50 rounded-xl border border-blue-200 flex items-center justify-center text-lg">
            📁
        </div>
        <h2 class="text-lg font-black text-gray-900">Archivos</h2>
    </div>

    <div class="space-y-3">
        {#each files as file}
            <div class="group flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 cursor-pointer">
                <div class="w-10 h-10 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:border-blue-200 transition-all">
                    <FileText size={18} class="text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-bold text-gray-800 truncate">{file.name}</p>
                    <p class="text-xs text-gray-400">
                        {file.size || 'Archivo'} · {file.date ? new Date(file.date).toLocaleDateString('es-MX', { month: 'short', day: 'numeric' }) : ''}
                    </p>
                </div>
                <a class="shrink-0 opacity-0 group-hover:opacity-100 transition-all" href={file.url || 'No link'}>
                    <Download size={16} class="text-gray-400 hover:text-[#f9c710] transition-colors" />
                </a>
            </div>
        {:else}
            <div class="text-center py-8">
                <span class="text-3xl block mb-2 opacity-30">📂</span>
                <p class="text-sm text-gray-400">Sin archivos aún</p>
            </div>
        {/each}
    </div>
</div>
