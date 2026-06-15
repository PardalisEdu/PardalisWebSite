<script lang="ts">
  let openIndex: number | null = $state(null);

  function toggle(index: number) {
    openIndex = openIndex === index ? null : index;
  }

  const faqs = [
    {
      q: "¿Qué es Pardalis?",
      a: "Pardalis es una plataforma educativa gratuita y open source diseñada para que niños de primaria en México aprendan inglés de forma divertida, usando situaciones cotidianas de su entorno como ir al mercado, la tortillería o el tianguis."
    },
    {
      q: "¿Para qué edades está pensada?",
      a: "Principalmente para niños de primaria baja (1ro a 4to grado), aunque cualquier niño que esté empezando con el inglés puede beneficiarse."
    },
    {
      q: "¿Es realmente gratis?",
      a: "Sí, 100% gratis. No hay suscripciones, ni anuncios, ni compras dentro de la aplicación. Pardalis es open source bajo licencia GPL v3, lo que significa que cualquier persona puede usarlo, estudiarlo y mejorarlo."
    },
    {
      q: "¿Cómo ayuda Pardalis a mi hijo si no sabe nada de inglés?",
      a: "Pardalis está diseñado para niños que empiezan desde cero. Las lecciones usan imágenes, audio y contexto mexicano para que el niño entienda el significado de forma natural, sin necesidad de traducciones."
    },
    {
      q: "¿Sustituye a las clases de inglés de la escuela?",
      a: "No. Pardalis es una herramienta complementaria. No busca reemplazar al maestro, sino darle un recurso divertido para que los niños practiquen fuera del aula y lleguen más familiarizados con el idioma."
    },
    {
      q: "¿Qué datos personales se necesitan para registrarse?",
      a: "Muy pocos. Solo pedimos un apodo (nickname), un nombre y un correo electrónico del tutor. Los niños no ingresan datos personales sensibles como dirección, ubicación o fotos."
    },
    {
      q: "¿En qué dispositivos funciona?",
      a: "Pardalis funciona en cualquier navegador web moderno: computadoras, tabletas y celulares. Está optimizado para funcionar bien incluso en conexiones lentas."
    },
    {
      q: "¿Los maestros pueden usar Pardalis en el salón de clases?",
      a: "¡Claro! De hecho, está diseñado pensando en eso. Los maestros pueden proyectar las misiones en el pizarrón, asignar actividades y dar seguimiento al progreso de sus alumnos."
    },
    {
      q: "¿Pardalis da certificados de inglés?",
      a: "No. Pardalis no emite certificaciones oficiales. Su objetivo es familiarizar a los niños con el idioma de forma temprana y divertida, no evaluar ni certificar."
    },
    {
      q: "¿Cómo puedo contribuir al proyecto?",
      a: "Pardalis es open source. Puedes contribuir en GitHub reportando bugs, sugiriendo mejoras, ayudando con el código o compartiendo la plataforma con más personas. Todo el código está en github.com/PardalisEdu/PardalisWebSite."
    },
    {
      q: "¿Hay planes de cobrar en el futuro?",
      a: "No. El compromiso del proyecto es mantener la educación como prioridad sobre el lucro. Pardalis siempre será gratuito."
    }
  ];
</script>

<div class="min-h-screen bg-[#FFFDF5]">
  <!-- Hero -->
  <div class="relative overflow-hidden bg-linear-to-br from-[#f9c710] via-[#f9c710] to-yellow-300 pt-28 pb-20 md:pt-36 md:pb-28">
    <div class="absolute inset-0 pointer-events-none">
      <svg width="100%" height="100%" class="opacity-10">
        <pattern id="dots-faq" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="2" fill="white" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#dots-faq)" />
      </svg>

    </div>
    <div class="relative container mx-auto px-4 text-center">
      <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full font-bold text-sm mb-6 shadow-lg">
        <span>❓</span>
        Respuestas rápidas
      </div>
      <h1 class="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-sm">
        Preguntas Frecuentes
      </h1>
      <p class="text-xl md:text-2xl text-yellow-900 font-medium max-w-3xl mx-auto">
        Todo lo que siempre quisiste saber sobre Pardalis.
      </p>
    </div>
  </div>

  <!-- FAQ list -->
  <div class="container mx-auto px-4 -mt-8 relative z-10">
    <div class="max-w-3xl mx-auto">
      <div class="bg-white rounded-[3rem] border-4 border-yellow-100 shadow-[0_14px_0_0_#fef08a] p-6 md:p-10">
        <div class="space-y-3">
          {#each faqs as faq, i}
            <div
              class="rounded-2xl border-2 transition-all duration-300 {openIndex === i ? 'border-[#f9c710] bg-yellow-50' : 'border-gray-100 bg-white hover:border-yellow-200'}"
            >
              <button
                class="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                onclick={() => toggle(i)}
              >
                <span class="font-bold text-gray-900 text-lg pr-4">{faq.q}</span>
                <span
                  class="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 {openIndex === i ? 'bg-[#f9c710] text-white rotate-45' : 'bg-gray-100 text-gray-400'}"
                >
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>
              {#if openIndex === i}
                <div class="px-6 pb-5 pt-0">
                  <p class="text-gray-600 font-medium leading-relaxed">{faq.a}</p>
                </div>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- Still have questions -->
  <div class="container mx-auto px-4 py-20">
    <div class="text-center max-w-2xl mx-auto bg-white rounded-[3rem] border-4 border-blue-100 shadow-[0_12px_0_0_#bfdbfe] p-10 md:p-14">
      <span class="text-5xl mb-4 block">💬</span>
      <h2 class="text-3xl md:text-4xl font-black text-gray-900 mb-4">¿No encontraste lo que buscabas?</h2>
      <p class="text-gray-500 font-medium mb-8">
        Escríbenos y te responderemos lo antes posible.
      </p>
      <a
        href="mailto:garcia.garcia.oscar2376@gmail.com"
        class="inline-flex items-center gap-3 bg-[#f9c710] text-gray-900 px-10 py-4 rounded-2xl font-black text-lg shadow-[0_6px_0_0_#d4a007] hover:shadow-none hover:translate-y-1.5 active:scale-95 transition-all duration-150"
      >
        <span>📧</span>
        Contactarnos
      </a>
    </div>
  </div>
</div>