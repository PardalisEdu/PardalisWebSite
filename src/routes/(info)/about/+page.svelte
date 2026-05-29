<script>
    import { fade } from 'svelte/transition';

    const sections = [
        {
            title: "Nuestra Misión",
            content: "Pardalis es una plataforma digital diseñada para acompañar y potenciar el aprendizaje del idioma inglés en estudiantes de primaria baja, con un enfoque especial en aquellos de escasos recursos. Buscamos enriquecer el proceso de aprendizaje mediante actividades lúdicas, interactivas y estructuradas que motiven a los estudiantes a adquirir competencias lingüísticas desde una edad temprana.",
            icon: "🎯"
        },
        {
            title: "Valores Fundamentales",
            content: "Nos guiamos por principios de innovación, accesibilidad, compromiso, empatía y excelencia. Creemos que el aprendizaje del inglés debe ser una experiencia dinámica y atractiva, adaptada a las necesidades de cada estudiante.",
            icon: "💖"
        },
        {
            title: "¿Por qué Open Source?",
            content: "Pardalis es orgullosamente open source bajo la licencia GPL v3. Creemos en la transparencia, la colaboración y el acceso universal a la educación. Al ser open source, no solo compartimos código, sino también conocimiento, permitiendo que la comunidad contribuya y mejore la plataforma para beneficio de todos los estudiantes.",
            icon: "🔓"
        },
        {
            title: "Filosofía Educativa",
            content: "Nuestra filosofía se basa en la creencia de que el aprendizaje de un nuevo idioma debe ser una experiencia significativa y relevante. Combinamos recursos educativos interactivos, juegos y lecciones estructuradas para inculcar no solo el inglés, sino también una pasión por aprender.",
            icon: "📚"
        }
    ];

    const team = [
        { name: "Poncho", role: "Arquitecto y Diseñador Principal", emoji: "👨‍💻" },
        { name: "Isaac", role: "Manager de experiencias interactivas", emoji: "🎨" },
        { name: "Ramos", role: "Documentador Oficial", emoji: "📝" },
        { name: "Oscar", role: "Desarrollador de videojuegos", emoji: "🎭" },
        { name: "Angel", role: "Desarrollador Full Stack", emoji: "⚡" }
    ];
</script>

<svelte:head>
    <title>Sobre Nosotros | Pardalis - Educación Abierta</title>
    <meta name="description" content="Conoce la misión, visión y el equipo detrás de Pardalis, la plataforma open source para aprender inglés en México." />
    <meta name="keywords" content="Pardalis equipo, misión Pardalis, inglés open source México" />
</svelte:head>

<div class="min-h-screen bg-[#FFFDF5] font-sans">
    <!-- Hero -->
    <div class="relative overflow-hidden bg-linear-to-br from-[#f9c710] via-[#f9c710] to-yellow-300 pt-28 pb-20 md:pt-36 md:pb-28">
        <div class="absolute inset-0 pointer-events-none">
            <svg width="100%" height="100%" class="opacity-10">
                <pattern id="dots-about" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="2" fill="white" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#dots-about)" />
            </svg>
            <div class="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
            <div class="absolute -bottom-10 -left-10 w-80 h-80 bg-yellow-200/20 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
        <div class="relative container mx-auto px-4 text-center">
            <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full font-bold text-sm mb-6 shadow-lg">
                <span>🐾</span>
                Conoce nuestra historia
            </div>
            <h1 class="text-5xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-sm">
                Sobre Pardalis
            </h1>
            <p class="text-xl md:text-2xl text-yellow-900 font-medium max-w-3xl mx-auto leading-relaxed">
                Una plataforma educativa open source dedicada a hacer el aprendizaje del inglés accesible,
                divertido y efectivo para estudiantes de primaria.
            </p>
        </div>
    </div>

    <!-- Mission & Values cards -->
    <div class="container mx-auto px-4 -mt-10 relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            {#each sections as section, i}
                <div
                    in:fade={{ duration: 400, delay: i * 100 }}
                    class="group bg-white p-8 md:p-10 rounded-[2.5rem] border-4 border-yellow-100 shadow-[0_12px_0_0_#fef08a] hover:-translate-y-2 hover:shadow-[0_16px_0_0_#fef08a] transition-all duration-300"
                >
                    <div class="flex items-center gap-4 mb-6">
                        <div class="w-16 h-16 bg-yellow-50 rounded-2xl border-2 border-yellow-200 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300 shrink-0">
                            {section.icon}
                        </div>
                        <h2 class="text-2xl md:text-3xl font-black text-gray-900">
                            {section.title}
                        </h2>
                    </div>
                    <p class="text-lg text-gray-600 font-medium leading-relaxed">
                        {section.content}
                    </p>
                </div>
            {/each}
        </div>
    </div>

    <!-- Team Section -->
    <div class="container mx-auto px-4 py-20">
        <div class="text-center max-w-3xl mx-auto mb-16">
            <div class="inline-block mb-4 px-6 py-2 bg-blue-100 border-2 border-blue-200 rounded-full shadow-[0_4px_0_0_#bfdbfe] transform -rotate-1">
                <span class="text-blue-800 font-bold uppercase tracking-widest text-sm">El equipo</span>
            </div>
            <h2 class="text-4xl md:text-6xl font-black text-gray-900 mb-6">
                Detrás de <span class="text-[#f9c710]">Pardalis</span>
            </h2>
            <p class="text-xl text-gray-600 font-medium">
                Un grupo de apasionados por la educación y la tecnología, unidos para crear algo extraordinario.
            </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
            {#each team as member, i}
                <div
                    in:fade={{ duration: 400, delay: i * 100 }}
                    class="group bg-white rounded-[2rem] border-4 border-gray-100 shadow-[0_8px_0_0_#e5e7eb] hover:-translate-y-2 hover:shadow-[0_12px_0_0_#e5e7eb] transition-all duration-300 p-6 text-center"
                >
                    <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-full border-2 border-yellow-200 flex items-center justify-center text-4xl group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                        {member.emoji}
                    </div>
                    <h3 class="font-black text-lg text-gray-900 mb-1">
                        {member.name}
                    </h3>
                    <p class="text-gray-500 text-sm font-medium">
                        {member.role}
                    </p>
                </div>
            {/each}
        </div>
    </div>

    <!-- CTA -->
    <div class="container mx-auto px-4 pb-20">
        <div class="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3rem] p-10 md:p-16 text-center shadow-2xl">
            <div class="absolute inset-0 pointer-events-none">
                <div class="absolute top-0 right-0 w-72 h-72 bg-yellow-500/5 rounded-full blur-3xl"></div>
                <div class="absolute -bottom-10 -left-10 w-72 h-72 bg-yellow-500/5 rounded-full blur-3xl"></div>
            </div>
            <div class="relative">
                <span class="text-6xl mb-6 block">☕</span>
                <h2 class="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                    ¡Gracias por ser parte de <span class="text-[#f9c710]">Pardalis</span>!
                </h2>
                <p class="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Tu interés y apoyo nos ayudan a seguir mejorando y haciendo del aprendizaje del inglés
                    una experiencia más accesible y divertida para todos. Si te gustaría contribuir al proyecto,
                    ¡te invitamos a visitar nuestro repositorio!
                </p>
                <a
                    href="https://github.com/PardalisEdu/PardalisWebSite"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-3 bg-[#f9c710] text-gray-900 px-10 py-4 rounded-2xl font-black text-lg shadow-[0_6px_0_0_#d4a007] hover:shadow-none hover:translate-y-1.5 transition-all duration-150 active:scale-95"
                >
                    <span>🔗</span>
                    Visitar Repositorio
                </a>
            </div>
        </div>
    </div>
</div>