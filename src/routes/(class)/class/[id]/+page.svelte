<script lang="ts">
    import { ArrowLeft, FileText, Download, Calendar } from 'lucide-svelte';

    const announcements = [
        {
            id: 1,
            title: "Bienvenidos al curso",
            date: "2026-05-10",
            body: "¡Hola a todos! Bienvenidos a la clase de inglés 1°A. Durante este curso exploraremos el vecindario de Pardalis juntos. La primera misión es La Tortillería. ¡A divertirse aprendiendo!"
        },
        {
            id: 2,
            title: "Tarea: Completen La Tortillería",
            date: "2026-05-17",
            body: "Esta semana deben completar la misión de La Tortillería. Recuerden practicar los números del 1 al 10 en inglés. Si tienen dudas, pregunten en clase."
        },
        {
            id: 3,
            title: "Material para esta semana",
            date: "2026-05-20",
            body: "Subí dos archivos con vocabulario y ejercicios para practicar en casa. Pueden descargarlos desde la sección de Archivos."
        },
    ];

    const files = [
        { name: "Vocabulario-Tortilleria.pdf", size: "245 KB", date: "2026-05-20" },
        { name: "Ejercicios-Numeros-1-10.pdf", size: "180 KB", date: "2026-05-20" },
        { name: "Guia-Padres-Primeros-Pasos.pdf", size: "512 KB", date: "2026-05-10" },
    ];
</script>

<div class="min-h-screen bg-[#FFFDF5]">
    <!-- Header -->
    <div class="border-b border-gray-100 bg-white">
        <div class="max-w-5xl mx-auto px-4 pt-28 pb-10 md:pt-36 md:pb-12">
            <!-- Back -->
            <a
                href="/class"
                class="inline-flex items-center gap-1.5 text-sm font-bold text-gray-400 hover:text-gray-700 transition-colors mb-6 group"
            >
                <ArrowLeft size={16} class="group-hover:-translate-x-0.5 transition-transform" />
                Volver a clases
            </a>

            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <div class="flex items-center gap-3 mb-2">
                        <span class="text-xs font-bold text-yellow-700 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200 uppercase tracking-wider">
                            1° Primaria
                        </span>
                        <span class="text-xs text-gray-400 font-medium">
                            12 alumnos
                        </span>
                    </div>
                    <h1 class="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                        Inglés 1°A — Vespertino
                    </h1>
                    <p class="text-sm text-gray-400 mt-1">
                        Prof. María García
                    </p>
                </div>
                <div class="flex items-center gap-2 bg-gray-50 rounded-2xl border border-gray-200 px-5 py-3">
                    <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Código</span>
                    <span class="text-xl font-black text-[#f9c710] tracking-[0.15em]">TXK9MP</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Content -->
    <div class="max-w-5xl mx-auto px-4 py-10 md:py-14">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Main: Announcements -->
            <div class="lg:col-span-2 space-y-8">
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
                                    {new Date(ann.date).toLocaleDateString('es-MX', { month: 'short', day: 'numeric' })}
                                </span>
                            </div>
                            <p class="text-gray-600 leading-relaxed text-sm">{ann.body}</p>
                        </div>
                    {/each}
                </div>
            </div>

            <!-- Sidebar: Files -->
            <div class="lg:col-span-1">
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
                                    <p class="text-xs text-gray-400">{file.size} · {file.date}</p>
                                </div>
                                <div class="shrink-0 opacity-0 group-hover:opacity-100 transition-all">
                                    <Download size={16} class="text-gray-400 hover:text-[#f9c710] transition-colors" />
                                </div>
                            </div>
                        {/each}
                    </div>

                    {#if files.length === 0}
                        <div class="text-center py-8">
                            <span class="text-3xl block mb-2 text-gray-300">📂</span>
                            <p class="text-sm text-gray-400">Sin archivos aún</p>
                        </div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>