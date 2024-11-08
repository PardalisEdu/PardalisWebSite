<!-- Footer.svelte -->
<script>
    const sections = [
        {
            title: "Pardalis",
            links: [
                { text: "Inicio", href: "/" },
                { text: "Contribuir", href: "https://codeberg.org/Pardalis" },
                { text: "Sobre nosotros", href: "/about" }
            ]
        },
        {
            title: "Legal",
            links: [
                { text: "Términos y condiciones", href: "/terms" },
                { text: "Licencia", href: "/terms" }
            ]
        }
    ];
</script>

<footer class="bg-gray-900 text-white py-12 mt-auto">
    <div class="container mx-auto px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
            <!-- Logo y descripción -->
            <div class="col-span-2 md:col-span-1">
                <a href="/" class="text-2xl font-bold text-[#f9c710]">PARDALIS</a>
                <p class="mt-4 text-gray-400 text-sm">
                    Una plataforma educativa open source para el aprendizaje del inglés.
                </p>
            </div>

            <!-- Secciones de enlaces -->
            {#each sections as section}
                <div>
                    <h3 class="text-lg font-semibold mb-4 text-[#f9c710]">
                        {section.title}
                    </h3>
                    <ul class="space-y-2">
                        {#each section.links as link}
                            <li>
                                <a
                                        href={link.href}
                                        class="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                                        target={link.href.startsWith('http') ? '_blank' : '_self'}
                                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''}
                                >
                                    {link.text}
                                </a>
                            </li>
                        {/each}
                    </ul>
                </div>
            {/each}
        </div>

        <!-- Línea divisoria -->
        <div class="border-t border-gray-800 mt-8 pt-8">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <p class="text-gray-400 text-sm">
                    © {new Date().getFullYear()} Pardalis. Desarrollado con 💛 por el equipo Ponchoides.
                </p>
                <div class="mt-4 md:mt-0">
                    <a
                            href="https://codeberg.org/Pardalis"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                        🔓 Open Source
                    </a>
                </div>
            </div>
        </div>
    </div>
</footer>

<style>
    footer {
        width: 100%;
        min-height: 200px;
    }

    .container {
        max-width: 1200px;
    }
</style>