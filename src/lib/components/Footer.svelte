<script>
    const sections = [
        {
            title: "Pardalis",
            links: [
                { text: "Inicio", href: "/" },
                { text: "Contribuir", href: "https://github.com/PardalisEdu/PardalisWebSite" },
                { text: "Sobre nosotros", href: "/about" }
            ]
        },
        {
            title: "Legal",
            links: [
                { text: "Términos y condiciones", href: "/terms" },
                { text: "Licencia GPL v3", href: "/terms" }
            ]
        }
    ];
</script>

<footer class="bg-gray-900 text-white py-16 mt-auto">
    <div class="container mx-auto px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-10">
            <!-- Logo section -->
            <div class="col-span-2 md:col-span-1">
                <a href="/" class="text-3xl font-black tracking-tighter text-[#f9c710] hover:opacity-80 transition-opacity">
                    PARDALIS<span class="text-blue-400">.</span>
                </a>
                <p class="mt-4 text-gray-400 text-sm leading-relaxed max-w-xs">
                    Una plataforma educativa open source para que los niños mexicanos aprendan inglés jugando.
                </p>
                <div class="mt-6 flex gap-3">
                    <span class="text-2xl hover:scale-110 transition-transform cursor-default" title="Hecho en México">🇲🇽</span>
                    <span class="text-2xl hover:scale-110 transition-transform cursor-default" title="Open Source">🔓</span>
                    <span class="text-2xl hover:scale-110 transition-transform cursor-default" title="Educación">📚</span>
                </div>
            </div>

            <!-- Link sections -->
            {#each sections as section}
                <div>
                    <h3 class="text-lg font-black mb-5 text-[#f9c710] tracking-wide">
                        {section.title}
                    </h3>
                    <ul class="space-y-3">
                        {#each section.links as link}
                            <li>
                                <a
                                    href={link.href}
                                    class="text-gray-400 hover:text-white transition-all duration-200 text-sm font-medium hover:translate-x-1 inline-block"
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

        <!-- Bottom bar -->
        <div class="border-t border-gray-800 mt-12 pt-8">
            <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                <p class="text-gray-400 text-sm">
                    © {new Date().getFullYear()} Pardalis. Hecho con 💛 por el equipo Ponchoides.
                </p>
                <div class="flex items-center gap-6">
                    <a
                        href="https://github.com/PardalisEdu/PardalisWebSite"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium flex items-center gap-1.5"
                    >
                        <span>🐙</span>
                        GitHub
                    </a>
                    <span class="text-gray-700 text-sm">|</span>
                    <span class="text-gray-500 text-sm">v1.0.0</span>
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