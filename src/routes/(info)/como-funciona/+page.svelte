<script lang="ts">
  import { fade } from 'svelte/transition';

  const steps = [
    {
      icon: "👋",
      title: "Regístrate gratis",
      desc: "Crea una cuenta con un apodo divertido. No pedimos datos personales ni correos de niños — la privacidad es primero.",
      color: "yellow"
    },
    {
      icon: "🗺️",
      title: "Explora el vecindario",
      desc: "Entra a un mapa interactivo con locaciones mexicanas: la tortillería, el mercado, la papelería, el tianguis y más. Cada lugar es una misión.",
      color: "blue"
    },
    {
      icon: "🎮",
      title: "Juega y aprende",
      desc: "Completa actividades divertidas: emparejar imágenes, escuchar pronunciaciones, arrastrar palabras. Todo basado en situaciones reales de un niño mexicano.",
      color: "green"
    },
    {
      icon: "🏆",
      title: "Gana recompensas",
      desc: "Consigue sellos y emblemas al completar locaciones. Cada logro celebra tu esfuerzo sin presión ni competencia.",
      color: "purple"
    }
  ];

  const features = [
    {
      emoji: "🌮",
      title: "Contenido 100% mexicano",
      desc: "Nada de situaciones genéricas. Aprendes con escenarios que vives todos los días: ir por las tortillas, acompañar al mercado, la tienda de la esquina."
    },
    {
      emoji: "🎯",
      title: "Diversión primero",
      desc: "No somos un curso aburrido. Somos un videojuego interactivo donde el inglés llega solito mientras juegas."
    },
    {
      emoji: "👨‍🏫",
      title: "Aliado del maestro",
      desc: "Diseñada para complementar la clase presencial, no para reemplazarla. Los profesores pueden recomendar misiones alineadas a su plan de estudios."
    },
    {
      emoji: "🔓",
      title: "Open source y gratuito",
      desc: "Pardalis es completamente gratis y de código abierto (GPL v3). Creemos que la educación de calidad debe ser accesible para todos."
    }
  ];
</script>

<svelte:head>
    <title>¿Cómo funciona? | Pardalis - Aprende Jugando</title>
    <meta name="description" content="Descubre cómo Pardalis usa mini-juegos y situaciones reales mexicanas para enseñar inglés a niños de primaria. ¡Natural y divertido!" />
    <meta name="keywords" content="como funciona Pardalis, aprender inglés jugando, inglés niños México" />
</svelte:head>

<div class="min-h-screen bg-[#FFFDF5]">
  <!-- Hero -->
  <div class="relative overflow-hidden bg-linear-to-br from-[#f9c710] via-[#f9c710] to-yellow-300 pt-28 pb-20 md:pt-36 md:pb-28">
    <div class="absolute inset-0 pointer-events-none">
      <svg width="100%" height="100%" class="opacity-10">
        <pattern id="dots-como" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="2" fill="white" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#dots-como)" />
      </svg>
      <div class="absolute -top-10 -right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
      <div class="absolute bottom-10 left-10 w-80 h-80 bg-yellow-200/20 rounded-full blur-3xl animate-pulse-slow"></div>
    </div>
    <div class="relative container mx-auto px-4 text-center">
      <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full font-bold text-sm mb-6 shadow-lg">
        <span>🚀</span>
        Así funciona
      </div>
      <h1 class="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-sm">
        ¿Cómo funciona <span class="text-yellow-200">Pardalis</span>?
      </h1>
      <p class="text-xl md:text-2xl text-yellow-900 font-medium max-w-3xl mx-auto">
        Aprender inglés nunca fue tan natural. En 4 pasos tu hijo comenzará su aventura.
      </p>
    </div>
  </div>

  <!-- Steps -->
  <div class="container mx-auto px-4 -mt-10 relative z-10">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      {#each steps as step, i}
        <div
          in:fade={{ duration: 400, delay: i * 100 }}
          class="bg-white rounded-[2rem] border-4 border-{step.color}-100 shadow-[0_10px_0_0_var(--shadow-color)] p-6 md:p-8 text-center group hover:-translate-y-2 transition-all duration-300"
          style="--shadow-color: {step.color === 'yellow' ? '#fef08a' : step.color === 'blue' ? '#bfdbfe' : step.color === 'green' ? '#bbf7d0' : '#e9d5ff'}"
        >
          <div class="w-20 h-20 mx-auto mb-5 bg-{step.color}-50 rounded-2xl border-2 border-{step.color}-200 flex items-center justify-center text-4xl group-hover:scale-110 group-hover:-rotate-6 transition-transform">
            {step.icon}
          </div>
          <span class="inline-flex items-center justify-center w-8 h-8 bg-[#f9c710] text-white text-sm font-black rounded-full mb-3">
            {i + 1}
          </span>
          <h3 class="text-xl font-black text-gray-900 mb-3">{step.title}</h3>
          <p class="text-gray-600 font-medium leading-relaxed text-sm">{step.desc}</p>
        </div>
      {/each}
    </div>
  </div>

  <!-- Features -->
  <div class="container mx-auto px-4 py-20">
    <div class="text-center max-w-3xl mx-auto mb-16">
      <h2 class="text-4xl md:text-6xl font-black text-gray-900 mb-6">
        ¿Qué hace especial a <span class="text-[#f9c710]">Pardalis</span>?
      </h2>
      <p class="text-xl text-gray-600 font-medium">
        No somos otra plataforma de inglés. Esto es lo que nos diferencia.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      {#each features as feature, i}
        <div
          in:fade={{ duration: 400, delay: i * 100 }}
          class="group bg-white p-8 md:p-10 rounded-[2.5rem] border-4 border-yellow-100 shadow-[0_12px_0_0_#fef08a] hover:-translate-y-2 hover:shadow-[0_16px_0_0_#fef08a] transition-all duration-300 flex items-start gap-6"
        >
          <div class="w-20 h-20 shrink-0 bg-yellow-50 rounded-2xl border-2 border-yellow-200 flex items-center justify-center text-4xl group-hover:scale-110 group-hover:-rotate-6 transition-transform">
            {feature.emoji}
          </div>
          <div>
            <h3 class="text-2xl font-black text-gray-900 mb-3">{feature.title}</h3>
            <p class="text-gray-600 font-medium leading-relaxed">{feature.desc}</p>
          </div>
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
        <span class="text-6xl mb-6 block">🎒</span>
        <h2 class="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
          ¿Listo para comenzar la <span class="text-[#f9c710]">aventura</span>?
        </h2>
        <p class="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Es gratis, es divertido y está hecho pensando en los niños de México.
        </p>
        <a
          href="/register"
          class="inline-flex items-center gap-3 bg-[#f9c710] text-gray-900 px-10 py-4 rounded-2xl font-black text-lg shadow-[0_6px_0_0_#d4a007] hover:shadow-none hover:translate-y-1.5 active:scale-95 transition-all duration-150"
        >
          <span>🚀</span>
          ¡Regístrate gratis!
        </a>
      </div>
    </div>
  </div>
</div>