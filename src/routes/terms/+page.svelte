<script lang="ts">
  const sections = [
    {
      title: "Términos generales",
      content:
        "Al acceder y realizar un pedido con Pardalis, usted confirma que está de acuerdo y sujeto a los términos de servicio contenidos en los Términos y condiciones que se describen a continuación.",
      icon: "📋",
    },
    {
      title: "Licencia",
      content:
        "Pardalis es un software de código abierto bajo la Licencia Pública General de GNU versión 3 (GPL v3). Esta licencia le garantiza la libertad de usar, estudiar, compartir y modificar el software. Cualquier software derivado debe distribuirse bajo los mismos términos de la GPL v3.",
      icon: "📜",
    },
    {
      title: "Privacidad y Cookies",
      content:
        "Pardalis utiliza cookies para mejorar el rendimiento y la funcionalidad de nuestra plataforma. Puede configurar su navegador para rechazar cookies, pero esto puede limitar su acceso a ciertas funcionalidades.",
      icon: "🔒",
    },
  ];

  let lastUpdateDate = "2024-11-08";

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
</script>

<div class="min-h-screen flex flex-col bg-[#FFFDF5]">
  <!-- Hero -->
  <div class="relative overflow-hidden bg-linear-to-br from-[#f9c710] via-[#f9c710] to-yellow-300 pt-28 pb-16 md:pt-36 md:pb-20">
    <div class="absolute inset-0 pointer-events-none">
      <svg width="100%" height="100%" class="opacity-10">
        <pattern id="dots-terms" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="2" fill="white" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#dots-terms)" />
      </svg>
      <div class="absolute top-10 right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
    </div>
    <div class="relative container mx-auto px-4 text-center">
      <h1 class="text-5xl md:text-7xl font-black text-white mb-4 drop-shadow-sm">
        Términos y Condiciones
      </h1>
      <p class="text-yellow-900 font-bold text-lg">
        Última actualización: {lastUpdateDate}
      </p>
    </div>
  </div>

  <!-- Content -->
  <div class="container mx-auto px-4 py-10 flex flex-col md:flex-row gap-8">
    <!-- Sidebar -->
    <aside class="md:w-1/4 shrink-0">
      <div class="sticky top-28 bg-white rounded-[2rem] border-4 border-yellow-100 shadow-[0_8px_0_0_#fef08a] p-6">
        <h3 class="font-black text-lg mb-5 text-gray-900 flex items-center gap-2">
          <span>📑</span> Contenido
        </h3>
        <nav class="space-y-2">
          {#each sections as section}
            <button
              class="w-full text-left px-4 py-2.5 rounded-xl font-bold transition-all duration-200 hover:bg-yellow-50 text-gray-600 hover:text-yellow-700 hover:translate-x-0.5"
              onclick={() =>
                scrollToSection(
                  section.title.toLowerCase().replace(/\s+/g, "-"),
                )}
            >
              <span class="mr-2">{section.icon}</span>
              {section.title}
            </button>
          {/each}
        </nav>
      </div>
    </aside>

    <!-- Main content -->
    <main class="md:w-3/4">
      <div class="bg-white rounded-[2.5rem] border-4 border-yellow-100 shadow-[0_12px_0_0_#fef08a] p-8 md:p-12">
        <!-- Intro banner -->
        <div class="bg-yellow-50 border-l-4 border-[#f9c710] rounded-xl p-5 mb-10">
          <p class="text-gray-700 font-medium leading-relaxed">
            Al utilizar Pardalis, aceptas nuestros términos y condiciones. Por
            favor, lee cuidadosamente este documento.
          </p>
        </div>

        <!-- Sections -->
        {#each sections as section}
          <section
            class="mb-12 last:mb-0"
            id={section.title.toLowerCase().replace(/\s+/g, "-")}
          >
            <div class="flex items-center gap-4 mb-6 pb-4 border-b-2 border-gray-100">
              <div class="w-12 h-12 bg-yellow-50 rounded-xl border-2 border-yellow-200 flex items-center justify-center text-2xl shrink-0">
                {section.icon}
              </div>
              <h2 class="text-2xl md:text-3xl font-black text-gray-900">{section.title}</h2>
            </div>
            <p class="text-gray-700 leading-relaxed mb-6 text-lg">
              {section.content}
            </p>

            <!-- Terms general subsections -->
            {#if section.title === "Términos generales"}
              <div class="space-y-6">
                {#each [
                  { title: "Definiciones y términos clave", content: "Para ayudar a explicar las cosas de la manera más clara posible en estos Términos y Condiciones, cada vez que se hace referencia a cualquiera de estos términos, se definen estrictamente como:" },
                  { title: "Restricciones", content: "Usted acepta no hacerlo y no permitirá que otros:" },
                  { title: "Política de Devolución y Reembolso", content: "Gracias por comprar en Pardalis. Apreciamos el hecho de que le guste comprar las cosas que construimos. También queremos asegurarnos de que tenga una experiencia gratificante mientras explora, evalúa y compra nuestros productos." },
                  { title: "Tu consentimiento", content: "Hemos actualizado nuestros Términos y condiciones para brindarle total transparencia sobre lo que se establece cuando visita nuestro sitio y como se utiliza. Al utilizar nuestra plataforma, registrar una cuenta o realizar una compra, por la presente acepta nuestros Términos y condiciones." },
                ] as sub}
                  <div class="bg-white rounded-xl border-2 border-gray-100 shadow-sm p-6">
                    <h3 class="text-xl font-black text-gray-900 mb-3">{sub.title}</h3>
                    <p class="text-gray-700 leading-relaxed">{sub.content}</p>
                  </div>
                {/each}
              </div>
            {/if}

            <!-- License subsections -->
            {#if section.title === "Licencia"}
              <div class="space-y-6">
                <div class="bg-white rounded-xl border-2 border-gray-100 shadow-sm p-6">
                  <h3 class="text-xl font-black text-gray-900 mb-3">Derechos fundamentales bajo GPL v3</h3>
                  <ul class="space-y-2">
                    {#each ["Libertad para ejecutar el programa con cualquier propósito", "Libertad para estudiar y modificar el código fuente", "Libertad para redistribuir copias", "Libertad para distribuir versiones modificadas"] as right}
                      <li class="flex items-start gap-3 text-gray-700">
                        <span class="text-green-500 mt-0.5 shrink-0">✓</span>
                        {right}
                      </li>
                    {/each}
                  </ul>
                </div>
                <div class="bg-white rounded-xl border-2 border-gray-100 shadow-sm p-6">
                  <h3 class="text-xl font-black text-gray-900 mb-3">Obligaciones</h3>
                  <ul class="space-y-2">
                    {#each ["Mantener el aviso de copyright y licencia", "Proporcionar acceso al código fuente", "Las modificaciones deben distribuirse bajo GPL v3", "Documentar los cambios realizados al software"] as obligation}
                      <li class="flex items-start gap-3 text-gray-700">
                        <span class="text-yellow-500 mt-0.5 shrink-0">→</span>
                        {obligation}
                      </li>
                    {/each}
                  </ul>
                </div>
              </div>
            {/if}
          </section>
        {/each}
      </div>
    </main>
  </div>
</div>