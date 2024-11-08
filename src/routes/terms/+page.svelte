<script>
    import NavBar from '$components/NavBar.svelte';
    import { onMount } from 'svelte';

    const sections = [
        {
            title: "Términos generales",
            content: "Al acceder y realizar un pedido con Pardalis, usted confirma que está de acuerdo y sujeto a los términos de servicio contenidos en los Términos y condiciones que se describen a continuación.",
            icon: "📋"
        },
        {
            title: "Licencia",
            content: "Pardalis le otorga una licencia revocable, no exclusiva, intransferible y limitada para descargar, instalar y usar la website estrictamente de acuerdo con los términos de este Acuerdo.",
            icon: "📜"
        },
        {
            title: "Privacidad y Cookies",
            content: "Pardalis utiliza cookies para mejorar el rendimiento y la funcionalidad de nuestra plataforma. Puede configurar su navegador para rechazar cookies, pero esto puede limitar su acceso a ciertas funcionalidades.",
            icon: "🔒"
        },
        {
            title: "Restricciones",
            content: "Licenciar, vender, alquilar, arrendar, asignar, distribuir, transmitir, alojar, subcontratar, divulgar o explotar comercialmente la plataforma. Eliminar, alterar u ocultar cualquier aviso de propiedad.",
            icon: "🚫"
        }
    ];

    let lastUpdateDate = "2024-11-08";
    let activeSection = null;

    // Para el efecto de scroll suave
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
</script>

<div class="min-h-screen flex flex-col bg-gray-50">
    <!-- Hero Section -->
    <div class="bg-gradient-to-b from-[#f9c710] to-yellow-300 py-20 mt-16">
        <div class="container mx-auto px-4 text-center">
            <h1 class="text-4xl md:text-6xl font-bold text-white mb-4">
                Términos y Condiciones
            </h1>
            <p class="text-white">
                Última actualización: {lastUpdateDate}
            </p>
        </div>
    </div>

    <!-- Contenido Principal -->
    <div class="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        <!-- Sidebar de navegación -->
        <aside class="md:w-1/4">
            <div class="sticky top-24 bg-white rounded-lg shadow-lg p-6">
                <h3 class="font-bold text-lg mb-4 text-gray-900">Contenido</h3>
                <nav class="space-y-2">
                    {#each sections as section}
                        <button
                                class="w-full text-left px-4 py-2 rounded-lg transition-colors hover:bg-yellow-100 text-gray-700 hover:text-gray-900"
                                on:click={() => scrollToSection(section.title.toLowerCase().replace(/\s+/g, '-'))}
                        >
                            <span class="mr-2">{section.icon}</span>
                            {section.title}
                        </button>
                    {/each}
                </nav>
            </div>
        </aside>

        <!-- Contenido principal -->
        <main class="md:w-3/4">
            <div class="bg-white rounded-lg shadow-lg p-8">
                <!-- Introducción -->
                <div class="mb-12">
                    <div class="p-4 bg-yellow-50 border-l-4 border-[#f9c710] rounded">
                        <p class="text-gray-700">
                            Al utilizar Pardalis, aceptas nuestros términos y condiciones. Por favor, lee cuidadosamente este documento.
                        </p>
                    </div>
                </div>

                <!-- Secciones -->
                {#each sections as section}
                    <section class="mb-12" id={section.title.toLowerCase().replace(/\s+/g, '-')}>
                        <div class="flex items-center mb-6">
                            <span class="text-3xl mr-4">{section.icon}</span>
                            <h2 class="text-3xl font-bold text-gray-900">{section.title}</h2>
                        </div>
                        <div class="prose max-w-none">
                            <p class="text-gray-700 leading-relaxed mb-6">
                                {section.content}
                            </p>
                            <!-- Subsecciones con estilo -->
                            {#if section.title === "Términos generales"}
                                <div class="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                                    <h3 class="text-xl font-semibold mb-4">Responsabilidad</h3>
                                    <p class="text-gray-700">
                                        Pardalis no será responsable de ningún resultado que pueda ocurrir durante el curso del uso de nuestros recursos. Nos reservamos el derecho de cambiar los precios y revisar la política de uso de recursos en cualquier momento.
                                    </p>
                                </div>
                            {/if}
                        </div>
                    </section>
                {/each}

                <!-- Sección de contacto -->
                <section class="mt-12 bg-gray-50 rounded-lg p-8">
                    <h2 class="text-2xl font-bold text-gray-900 mb-4">¿Necesitas ayuda?</h2>
                    <p class="text-gray-700 mb-4">
                        Si tienes alguna pregunta sobre nuestros términos y condiciones, no dudes en contactarnos.
                    </p>
                    <a
                            href="mailto:contacto@pardalis.com"
                            class="inline-flex items-center bg-[#f9c710] text-white px-6 py-3 rounded-lg font-bold hover:bg-yellow-600 transition-colors"
                    >
                        Contáctanos
                    </a>
                </section>
            </div>
        </main>
    </div>
</div>

<style>

    .container {
        max-width: 1200px;
    }

    .prose p {
        line-height: 1.8;
    }
</style>