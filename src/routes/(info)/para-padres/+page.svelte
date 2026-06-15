<script lang="ts">
  import { fade } from 'svelte/transition';

  const benefits = [
    {
      icon: "🛡️",
      title: "Seguro y privado",
      desc: "No recopilamos datos personales de los niños. Sin nombres reales, sin ubicaciones, sin redes sociales. La privacidad de tu hijo es nuestra prioridad.",
      color: "green"
    },
    {
      icon: "📚",
      title: "Refuerzo escolar",
      desc: "Pardalis complementa lo que tu hijo ve en la escuela. No sustituye al maestro, sino que le da una herramienta divertida para practicar en casa.",
      color: "blue"
    },
    {
      icon: "🎮",
      title: "Aprende jugando",
      desc: "Olvídate de las luchas para que haga la tarea. En Pardalis, tu hijo querrá jugar — y sin darse cuenta estará aprendiendo inglés.",
      color: "purple"
    },
    {
      icon: "🇲🇽",
      title: "Hecho para México",
      desc: "Situaciones que tu hijo reconoce: la tienda de la esquina, el mercado, las tortillas. Nada de contextos extraños o lecciones aburridas.",
      color: "yellow"
    },
    {
      icon: "💰",
      title: "100% gratuito",
      desc: "Sin anuncios, sin suscripciones, sin sorpresas. Pardalis es open source y siempre será gratis. Creemos en la educación accesible para todos.",
      color: "red"
    },
    {
      icon: "📱",
      title: "Desde cualquier dispositivo",
      desc: "Funciona en computadoras, tabletas y celulares. Tu hijo puede practicar desde la computadora de la escuela o desde tu teléfono en casa.",
      color: "indigo"
    }
  ];

  const tips = [
    "Anima a tu hijo a jugar 15 minutos al día — es el tiempo ideal para aprender sin cansarse.",
    "Si no sabes inglés, no importa. Pardalis está diseñado para que los niños aprendan solitos.",
    "Pregúntale qué locación del mapa visitó hoy y qué palabra nueva aprendió.",
    "Si es muy pequeño, siéntate con él las primeras veces para mostrarle cómo navegar.",
  ];
</script>

<svelte:head>
    <title>Guía para Padres | Pardalis - Aprendizaje Seguro</title>
    <meta name="description" content="Todo lo que los padres necesitan saber sobre Pardalis: seguridad, privacidad y cómo ayudar a sus hijos a aprender inglés jugando." />
    <meta name="keywords" content="inglés para hijos, seguridad educativa online, Pardalis padres" />
</svelte:head>

<div class="min-h-screen bg-[#FFFDF5]">
  <!-- Hero -->
  <div class="relative overflow-hidden bg-linear-to-br from-[#f9c710] via-[#f9c710] to-yellow-300 pt-28 pb-20 md:pt-36 md:pb-28">
    <div class="absolute inset-0 pointer-events-none">
      <svg width="100%" height="100%" class="opacity-10">
        <pattern id="dots-padres" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="2" fill="white" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#dots-padres)" />
      </svg>

    </div>
    <div class="relative container mx-auto px-4 text-center">
      <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full font-bold text-sm mb-6 shadow-lg">
        <span>👨‍👩‍👧‍👦</span>
        Para toda la familia
      </div>
      <h1 class="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-sm">
        Para <span class="text-yellow-200">papás</span>
      </h1>
      <p class="text-xl md:text-2xl text-yellow-900 font-medium max-w-3xl mx-auto">
        Todo lo que necesitas saber para que tu hijo aprenda inglés de forma divertida y segura.
      </p>
    </div>
  </div>

  <!-- Benefits -->
  <div class="container mx-auto px-4 -mt-10 relative z-10">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each benefits as b, i}
        <div
          in:fade={{ duration: 400, delay: i * 80 }}
          class="group bg-white rounded-[2rem] border-4 border-{b.color}-100 shadow-[0_10px_0_0_var(--shadow-color)] p-6 md:p-8 hover:-translate-y-2 transition-all duration-300"
          style="--shadow-color: {b.color === 'green' ? '#bbf7d0' : b.color === 'blue' ? '#bfdbfe' : b.color === 'purple' ? '#e9d5ff' : b.color === 'yellow' ? '#fef08a' : b.color === 'red' ? '#fecaca' : '#c7d2fe'}"
        >
          <div class="w-16 h-16 mb-5 bg-{b.color}-50 rounded-2xl border-2 border-{b.color}-200 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:-rotate-6 transition-transform">
            {b.icon}
          </div>
          <h3 class="text-xl font-black text-gray-900 mb-3">{b.title}</h3>
          <p class="text-gray-600 font-medium leading-relaxed text-sm">{b.desc}</p>
        </div>
      {/each}
    </div>
  </div>

  <!-- Tips -->
  <div class="container mx-auto px-4 py-20">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-[3rem] border-4 border-yellow-100 shadow-[0_14px_0_0_#fef08a] p-10 md:p-14">
        <div class="text-center mb-10">
          <span class="text-5xl mb-4 block">💡</span>
          <h2 class="text-3xl md:text-4xl font-black text-gray-900">Consejos para papás</h2>
          <p class="text-gray-500 font-medium mt-2">Ayuda a tu hijo a aprovechar Pardalis al máximo</p>
        </div>
        <div class="space-y-4">
          {#each tips as tip, i}
            <div
              in:fade={{ duration: 300, delay: i * 100 }}
              class="flex items-start gap-4 bg-yellow-50 rounded-2xl p-5 border-2 border-yellow-100"
            >
              <div class="w-10 h-10 bg-[#f9c710] rounded-xl flex items-center justify-center text-white font-black shrink-0">
                {i + 1}
              </div>
              <p class="text-gray-700 font-medium leading-relaxed pt-1">{tip}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- FAQ quick -->
  <div class="container mx-auto px-4 pb-20">
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-black text-gray-900 mb-4">¿Tienes más dudas?</h2>
      <p class="text-gray-500 font-medium">Visita nuestra sección de preguntas frecuentes</p>
    </div>
    <div class="text-center">
      <a
        href="/faq"
        class="inline-flex items-center gap-3 bg-[#f9c710] text-gray-900 px-10 py-4 rounded-2xl font-black text-lg shadow-[0_6px_0_0_#d4a007] hover:shadow-none hover:translate-y-1.5 active:scale-95 transition-all duration-150"
      >
        <span>❓</span>
        Ir a FAQ
      </a>
    </div>
  </div>
</div>