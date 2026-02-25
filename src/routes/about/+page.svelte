<script>

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

<div class="min-h-screen">
    <div class="bg-linear-to-b from-yellow-400 to-yellow-300 py-20 mt-16">
        <div class="container mx-auto px-4">
            <h1 class="text-4xl md:text-6xl font-bold text-center text-white mb-6">
                Sobre Pardalis
            </h1>
            <p class="text-xl text-center text-white max-w-3xl mx-auto">
                Una plataforma educativa open source dedicada a hacer el aprendizaje del inglés accesible,
                divertido y efectivo para estudiantes de primaria.
            </p>
        </div>
    </div>

    <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            {#each sections as section}
                <div class="bg-white rounded-lg shadow-lg p-8 transform hover:scale-105 transition-transform duration-200">
                    <div class="flex items-center mb-4">
                        <span class="text-3xl">{section.icon}</span>
                        <h2 class="text-2xl font-bold ml-4 text-gray-900">
                            {section.title}
                        </h2>
                    </div>
                    <p class="text-gray-700 leading-relaxed">
                        {section.content}
                    </p>
                </div>
            {/each}
        </div>

        <!-- Team Section -->
        <div class="mt-16">
            <div class="flex items-center justify-center mb-8">
                <span class="text-3xl mr-4">👥</span>
                <h2 class="text-3xl font-bold text-gray-900">
                    Nuestro Equipo
                </h2>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-5 gap-6">
                {#each team as member}
                    <div class="bg-white rounded-lg shadow-sm p-6 text-center transform hover:scale-105 transition-transform duration-200">
                        <span class="text-4xl mb-4 block">{member.emoji}</span>
                        <h3 class="font-bold text-lg text-gray-900 mb-2">
                            {member.name}
                        </h3>
                        <p class="text-gray-600 text-sm">
                            {member.role}
                        </p>
                    </div>
                {/each}
            </div>
        </div>

        <div class="mt-16 text-center bg-white rounded-lg shadow-lg p-8">
            <span class="text-4xl mb-4 block">☕</span>
            <h2 class="text-3xl font-bold text-gray-900 mb-4">
                ¡Gracias por ser parte de Pardalis!
            </h2>
            <p class="text-gray-700 max-w-2xl mx-auto leading-relaxed">
                Tu interés y apoyo nos ayudan a seguir mejorando y haciendo del aprendizaje del inglés
                una experiencia más accesible y divertida para todos. Si te gustaría contribuir al proyecto,
                ¡te invitamos a visitar nuestro repositorio!
            </p>
            <div class="mt-6">
                <a
                        href="https://github.com/PardalisEdu/PardalisWebSite"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center bg-[#f9c710] text-white px-6 py-3 rounded-lg font-bold hover:bg-yellow-600 transition-colors"
                >
                    <span class="mr-2">🔗</span>
                    Visitar Repositorio
                </a>
            </div>
        </div>
    </div>
</div>

<style>
    .container {
        max-width: 1200px;
    }

    .grid {
        grid-auto-rows: 1fr;
    }
</style>