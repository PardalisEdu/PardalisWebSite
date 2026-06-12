<script lang="ts">
    import { ArrowLeft } from 'lucide-svelte';

    let { 
        level = "1° Primaria", 
        studentCount = 12, 
        className = "Clase de Inglés", 
        teacherName = "Profesor", 
        classCode = "ABCDEF" 
    } = $props();
</script>

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
                        {level}
                    </span>
                    <span class="text-xs text-gray-400 font-medium">
                        {studentCount} alumnos
                    </span>
                </div>
                <h1 class="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
                    {className}
                </h1>
                <p class="text-sm text-gray-400 mt-1">
                    {teacherName}
                </p>
            </div>
            <div class="flex items-center gap-2 bg-gray-50 rounded-2xl border border-gray-200 px-5 py-3">
                <span class="text-xs font-bold text-gray-400 uppercase tracking-wider">Código</span>
                <span class="text-xl font-black text-[#f9c710] tracking-[0.15em]">{classCode}</span>
            </div>
        </div>
    </div>
</div>
