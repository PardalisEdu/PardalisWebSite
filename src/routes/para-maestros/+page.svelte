<script lang="ts">
  import { fade } from 'svelte/transition';

  const reasons = [
    {
      icon: "🤝",
      title: "Un aliado, no un reemplazo",
      desc: "Pardalis está diseñado para complementar tu clase, no para sustituirte. Eres tú quien guía el aprendizaje; nosotros solo ponemos la herramienta divertida.",
      color: "blue"
    },
    {
      icon: "📊",
      title: "Seguimiento de progreso",
      desc: "Próximamente: visualiza qué locaciones han completado tus alumnos, dónde tienen dificultades y quién necesita más apoyo.",
      color: "green"
    },
    {
      icon: "🎯",
      title: "Misiones alineadas a tu clase",
      desc: "Próximamente: asigna locaciones específicas para reforzar los temas que estás viendo en el aula esta semana.",
      color: "purple"
    },
    {
      icon: "🔌",
      title: "Fácil de implementar",
      desc: "Solo necesitas un proyector y una computadora. Tus alumnos pueden participar desde casa o desde el laboratorio escolar.",
      color: "yellow"
    }
  ];

  const ideas = [
    "Proyecta una misión en el pizarrón y haz que los alumnos participen en voz alta.",
    "Usa Pardalis como actividad de los últimos 10 minutos de clase — los niños se irán con una sonrisa.",
    "Crea un reto semanal: 'Esta semana todos completamos La Tortillería'.",
    "Pide a los alumnos que te enseñen una palabra nueva que aprendieron en Pardalis.",
    "Graba tu experiencia y compártela con otros maestros — entre todos hacemos comunidad.",
  ];
</script>

<div class="min-h-screen bg-[#FFFDF5]">
  <!-- Hero -->
  <div class="relative overflow-hidden bg-linear-to-br from-[#f9c710] via-[#f9c710] to-yellow-300 pt-28 pb-20 md:pt-36 md:pb-28">
    <div class="absolute inset-0 pointer-events-none">
      <svg width="100%" height="100%" class="opacity-10">
        <pattern id="dots-maestros" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="2" fill="white" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#dots-maestros)" />
      </svg>
      <div class="absolute -top-10 -right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float"></div>
      <div class="absolute bottom-10 left-10 w-80 h-80 bg-yellow-200/20 rounded-full blur-3xl animate-pulse-slow"></div>
    </div>
    <div class="relative container mx-auto px-4 text-center">
      <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full font-bold text-sm mb-6 shadow-lg">
        <span>🍎</span>
        Para el aula
      </div>
      <h1 class="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-sm">
        Para <span class="text-yellow-200">maestros</span>
      </h1>
      <p class="text-xl md:text-2xl text-yellow-900 font-medium max-w-3xl mx-auto">
        Una herramienta diseñada para sumar a tu clase, no para restar.
      </p>
    </div>
  </div>

  <!-- Why -->
  <div class="container mx-auto px-4 -mt-10 relative z-10">
    <div class="text-center max-w-3xl mx-auto mb-12">
      <div class="bg-white rounded-[2rem] border-4 border-yellow-100 shadow-[0_10px_0_0_#fef08a] p-8 md:p-10">
        <span class="text-4xl mb-4 block">💬</span>
        <h2 class="text-2xl md:text-3xl font-black text-gray-900 mb-4">¿Por qué Pardalis?</h2>
        <p class="text-lg text-gray-600 font-medium leading-relaxed">
          Sabemos lo difícil que es mantener la atención de 30 niños en una clase de inglés.
          Pardalis no viene a decirte cómo dar tu clase. Viene a darte un superpoder: 
          una herramienta que tus alumnos <span class="text-[#f9c710] font-black">querrán usar</span>.
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      {#each reasons as r, i}
        <div
          in:fade={{ duration: 400, delay: i * 100 }}
          class="group bg-white p-8 md:p-10 rounded-[2.5rem] border-4 border-{r.color}-100 shadow-[0_12px_0_0_var(--shadow-color)] hover:-translate-y-2 transition-all duration-300"
          style="--shadow-color: {r.color === 'blue' ? '#bfdbfe' : r.color === 'green' ? '#bbf7d0' : r.color === 'purple' ? '#e9d5ff' : '#fef08a'}"
        >
          <div class="flex items-center gap-4 mb-6">
            <div class="w-16 h-16 bg-{r.color}-50 rounded-2xl border-2 border-{r.color}-200 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:-rotate-6 transition-transform shrink-0">
              {r.icon}
            </div>
            <h3 class="text-2xl font-black text-gray-900">{r.title}</h3>
          </div>
          <p class="text-lg text-gray-600 font-medium leading-relaxed">{r.desc}</p>
        </div>
      {/each}
    </div>
  </div>

  <!-- Ideas -->
  <div class="container mx-auto px-4 py-20">
    <div class="max-w-4xl mx-auto">
      <div class="bg-white rounded-[3rem] border-4 border-blue-100 shadow-[0_14px_0_0_#bfdbfe] p-10 md:p-14">
        <div class="text-center mb-10">
          <span class="text-5xl mb-4 block">💡</span>
          <h2 class="text-3xl md:text-4xl font-black text-gray-900">Ideas para tu clase</h2>
          <p class="text-gray-500 font-medium mt-2">Formas creativas de usar Pardalis con tus alumnos</p>
        </div>
        <div class="space-y-4">
          {#each ideas as idea, i}
            <div
              in:fade={{ duration: 300, delay: i * 100 }}
              class="flex items-start gap-4 bg-blue-50 rounded-2xl p-5 border-2 border-blue-100"
            >
              <div class="w-10 h-10 bg-blue-400 rounded-xl flex items-center justify-center text-white font-black shrink-0">
                {i + 1}
              </div>
              <p class="text-gray-700 font-medium leading-relaxed pt-1">{idea}</p>
            </div>
          {/each}
        </div>
      </div>
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
        <span class="text-6xl mb-6 block">🍎</span>
        <h2 class="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
          ¿Listo para probarlo con <span class="text-[#f9c710]">tus alumnos</span>?
        </h2>
        <p class="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Es gratis, es fácil y a los niños les encanta.
        </p>
        <a
          href="/register"
          class="inline-flex items-center gap-3 bg-[#f9c710] text-gray-900 px-10 py-4 rounded-2xl font-black text-lg shadow-[0_6px_0_0_#d4a007] hover:shadow-none hover:translate-y-1.5 active:scale-95 transition-all duration-150"
        >
          <span>🚀</span>
          Comenzar ahora
        </a>
      </div>
    </div>
  </div>
</div>