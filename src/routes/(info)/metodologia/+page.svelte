<script lang="ts">
  const principles = [
    {
      icon: "🇲🇽",
      title: "Hiper-contextualización local",
      desc: "Usamos escenarios de la vida real de un niño mexicano: ir por las tortillas, el tianguis, la papelería, el mercado. Cuando el contenido es familiar, aprender es más natural.",
      color: "green"
    },
    {
      icon: "🎮",
      title: "Aprendizaje basado en juego",
      desc: "Convertimos cada lección en una misión dentro de un vecindario interactivo. Los niños olvidan que están estudiando porque están ocupados explorando y jugando.",
      color: "blue"
    },
    {
      icon: "🧠",
      title: "Adquisición orgánica",
      desc: "En lugar de memorizar listas de palabras, los niños aprenden vocabulario y frases en contexto. Así como aprendieron su lengua materna: por exposición y uso.",
      color: "purple"
    },
    {
      icon: "❤️",
      title: "Educación sin estrés",
      desc: "Sin exámenes, sin notas, sin presión. Usamos sistemas de recompensa que celebran el esfuerzo y la constancia, no la competencia.",
      color: "yellow"
    }
  ];

  const differences = [
    {
      pardalis: "Usa contextos mexicanos (tortillería, mercado, tianguis)",
      others: "Usa contextos genéricos internacionales (aeropuerto, hotel, restaurante fancy)"
    },
    {
      pardalis: "Diseñada como aliada del maestro presencial",
      others: "Buscan reemplazar la enseñanza presencial o ser el curso principal"
    },
    {
      pardalis: "Gratuita y open source (GPL v3)",
      others: "Planes de suscripción mensual/anual con costo"
    },
    {
      pardalis: "Interfaz tipo videojuego, amigable para niños",
      others: "Interfaz tipo aula virtual, formal y rígida"
    },
    {
      pardalis: "Enfoque en familiarización temprana, no certificación",
      others: "Enfocadas en resultados medibles y exámenes estandarizados"
    }
  ];
</script>

<svelte:head>
    <title>Metodología Educativa | Pardalis - Contexto Mexicano</title>
    <meta name="description" content="Nuestra metodología se basa en la hiper-contextualización local y el aprendizaje basado en el juego para enseñar inglés de forma efectiva en México." />
    <meta name="keywords" content="metodología Pardalis, aprendizaje orgánico inglés, enseñanza inglés México" />
</svelte:head>

<div class="min-h-screen bg-[#FFFDF5]">
  <!-- Hero -->
  <div class="relative overflow-hidden bg-linear-to-br from-[#f9c710] via-[#f9c710] to-yellow-300 pt-28 pb-20 md:pt-36 md:pb-28">
    <div class="absolute inset-0 pointer-events-none">
      <svg width="100%" height="100%" class="opacity-10">
        <pattern id="dots-met" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="2" fill="white" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#dots-met)" />
      </svg>

    </div>
    <div class="relative container mx-auto px-4 text-center">
      <div class="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full font-bold text-sm mb-6 shadow-lg">
        <span>📚</span>
        Nuestra filosofía
      </div>
      <h1 class="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-sm">
        Metodología
      </h1>
      <p class="text-xl md:text-2xl text-yellow-900 font-medium max-w-3xl mx-auto">
        Así es como enseñamos inglés de una forma que realmente funciona para los niños mexicanos.
      </p>
    </div>
  </div>

  <!-- Principles -->
  <div class="container mx-auto px-4 -mt-10 relative z-10">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      {#each principles as p, i}
        <div
          class="group bg-white p-8 md:p-10 rounded-[2.5rem] border-4 border-{p.color}-100 shadow-[0_12px_0_0_var(--shadow-color)] hover:-translate-y-2 transition-all duration-300"
          style="--shadow-color: {p.color === 'green' ? '#bbf7d0' : p.color === 'blue' ? '#bfdbfe' : p.color === 'purple' ? '#e9d5ff' : '#fef08a'}"
        >
          <div class="flex items-center gap-4 mb-6">
            <div class="w-16 h-16 bg-{p.color}-50 rounded-2xl border-2 border-{p.color}-200 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:-rotate-6 transition-transform shrink-0">
              {p.icon}
            </div>
            <h2 class="text-2xl font-black text-gray-900">{p.title}</h2>
          </div>
          <p class="text-lg text-gray-600 font-medium leading-relaxed">{p.desc}</p>
        </div>
      {/each}
    </div>
  </div>

  <!-- vs Others -->
  <div class="container mx-auto px-4 py-20">
    <div class="text-center max-w-3xl mx-auto mb-16">
      <h2 class="text-4xl md:text-6xl font-black text-gray-900 mb-6">
        ¿En qué somos <span class="text-[#f9c710]">diferentes</span>?
      </h2>
      <p class="text-xl text-gray-600 font-medium">
        No queremos ser como las demás plataformas. Aquí te decimos por qué.
      </p>
    </div>

    <div class="max-w-4xl mx-auto space-y-4">
      {#each differences as diff, i}
        <div class="group bg-white rounded-[2rem] border-4 border-gray-100 shadow-[0_8px_0_0_#e5e7eb] hover:-translate-y-1 transition-all duration-300 p-6 md:p-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-green-100 rounded-xl border-2 border-green-200 flex items-center justify-center text-lg shrink-0 mt-0.5">
                ✅
              </div>
              <div>
                <span class="text-xs font-black text-green-600 uppercase tracking-wider mb-1 block">Pardalis</span>
                <p class="text-gray-800 font-bold">{diff.pardalis}</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-red-50 rounded-xl border-2 border-red-200 flex items-center justify-center text-lg shrink-0 mt-0.5">
                ❌
              </div>
              <div>
                <span class="text-xs font-black text-red-500 uppercase tracking-wider mb-1 block">Otras plataformas</span>
                <p class="text-gray-500 font-medium">{diff.others}</p>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- CTA -->
  <div class="container mx-auto px-4 pb-20">
    <div class="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 rounded-[3rem] p-10 md:p-16 text-center shadow-2xl">

      <div class="relative">
        <span class="text-6xl mb-6 block">🌮</span>
        <h2 class="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
          Una forma <span class="text-[#f9c710]">más natural</span> de aprender inglés
        </h2>
        <p class="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Porque el inglés también se puede aprender entre tortillas y mercados.
        </p>
        <a
          href="/register"
          class="inline-flex items-center gap-3 bg-[#f9c710] text-gray-900 px-10 py-4 rounded-2xl font-black text-lg shadow-[0_6px_0_0_#d4a007] hover:shadow-none hover:translate-y-1.5 active:scale-95 transition-all duration-150"
        >
          <span>🚀</span>
          Quiero probarlo
        </a>
      </div>
    </div>
  </div>
</div>