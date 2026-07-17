<script lang="ts">
  import ArrowLeft from 'lucide-svelte/icons/arrow-left';
  import BookOpen from 'lucide-svelte/icons/book-open';
  import Star from 'lucide-svelte/icons/star';
  import Sparkles from 'lucide-svelte/icons/sparkles';
  import MapPin from 'lucide-svelte/icons/map-pin';

  interface Station {
    id: string;
    name: string;
    icon: string;
    description: string;
    href: string;
    x: number;
    y: number;
  }

  // Predictable zig-zag layout configuration for stations
  const stations: Station[] = [
    {
      id: '1',
      name: 'Pardalis Central 🐆',
      icon: '🐆',
      description: '¡Conoce a tu guía ocelote y practica frases de bienvenida en inglés!',
      href: '/mini-games/flashcards',
      x: 35,
      y: 90
    },
    {
      id: '2',
      name: 'La Tortillería 🌽',
      icon: '🌽',
      description: 'Aprende los números y vocabulario del maíz en situaciones reales.',
      href: '/mini-games/scramble',
      x: 65,
      y: 250
    },
    {
      id: '3',
      name: 'El Mercado 🍎',
      icon: '🍎',
      description: 'Aprende a pedir frutas, verduras y a preguntar precios en inglés.',
      href: '/mini-games/memory',
      x: 30,
      y: 410
    },
    {
      id: '4',
      name: 'La Taquería 🌮',
      icon: '🌮',
      description: '¡Ordena tus tacos con salsa, cebolla y cilantro en inglés!',
      href: '/mini-games/taco',
      x: 70,
      y: 570
    },
    {
      id: '5',
      name: 'Zócalo de Saludos 👋',
      icon: '👋',
      description: 'Platica con tus amigos y entabla conversaciones cotidianas.',
      href: '/mini-games/oraclecards',
      x: 50,
      y: 730
    }
  ];

  // Derive SVG path coordinate string from the stations coordinate array
  const pathD = $derived(
    stations.map((s, idx) => `${idx === 0 ? 'M' : 'L'} ${s.x} ${s.y}`).join(' ')
  );

  // Derive total height of the map canvas dynamically based on the last station's coordinate
  const mapHeight = $derived(
    stations.length > 0 ? stations[stations.length - 1].y + 110 : 800
  );
</script>

<div class="min-h-screen bg-cream pt-28 pb-16 px-4 flex flex-col items-center relative overflow-hidden font-sans">
  <div class="w-full max-w-xl mx-auto relative z-10 flex flex-col">
    
    <!-- Back Button -->
    <a
      href="/"
      class="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 font-extrabold rounded-2xl border-2 border-gray-200 shadow-[0_4px_0_0_#e5e7eb] hover:translate-y-[2px] hover:shadow-[0_2px_0_0_#e5e7eb] active:translate-y-[4px] active:shadow-none transition-all mb-8 group self-start"
    >
      <ArrowLeft size={18} class="group-hover:-translate-x-0.5 transition-transform" />
      <span>Volver al Inicio</span>
    </a>

    <!-- CDMX Metro Style Signage Header -->
    <div class="w-full bg-[#111827] text-white rounded-[2rem] border-b-8 border-brand shadow-[0_8px_0_0_var(--color-brand-dark)] p-6 mb-12 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
      <!-- Decorative background train emoji -->
      <div class="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center select-none">
        <span class="text-9xl font-black -mr-10">🚇</span>
      </div>

      <div class="flex items-center gap-5 relative z-10">
        <!-- Metro Logo Box -->
        <div class="w-16 h-16 bg-brand rounded-2xl flex items-center justify-center border-4 border-white shadow-md select-none shrink-0">
          <span class="text-3xl font-black text-gray-900 tracking-tighter">P</span>
        </div>
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="text-[10px] font-black bg-brand text-gray-900 px-2.5 py-0.5 rounded-full uppercase tracking-widest">
              Línea P
            </span>
            <span class="text-[10px] font-bold text-gray-400">
              Red Pardalis
            </span>
          </div>
          <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight uppercase font-sans">
            Ruta de Aprendizaje
          </h1>
        </div>
      </div>

      <div class="flex flex-col sm:items-end text-center sm:text-right relative z-10 shrink-0">
        <p class="text-[10px] text-gray-400 font-black uppercase tracking-wider">Siguiente Estación</p>
        <p class="text-lg font-black text-brand uppercase tracking-wide">
          {stations[0].name}
        </p>
      </div>
    </div>

    <!-- METRO MAP AREA CONTAINER -->
    <div 
      class="w-full relative rounded-[2.5rem] border-4 border-gray-200 bg-white/40 shadow-[0_12px_0_0_#e5e7eb] overflow-hidden"
      style="height: {mapHeight}px"
    >
      <!-- Metro Grid Overlay (Optional visual effect matching CDMX aesthetic) -->
      <div class="absolute inset-0 bg-radial-dots opacity-[0.05] pointer-events-none"></div>

      <!-- SVG METRO LINES LAYER -->
      <svg
        width="100%"
        height={mapHeight}
        viewBox="0 0 100 {mapHeight}"
        preserveAspectRatio="none"
        class="absolute inset-0 z-0 pointer-events-none"
      >
        <!-- Shadow/Border of the metro line -->
        <path
          d={pathD}
          fill="none"
          stroke="#111827"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <!-- Main Yellow Metro Line -->
        <path
          d={pathD}
          fill="none"
          stroke="#f9c710"
          stroke-width="1.0"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <!-- Animated white pulse dashed line (representing train moving) -->
        <path
          d={pathD}
          fill="none"
          stroke="#ffffff"
          stroke-width="0.25"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="opacity-75 animate-train-line"
        />
      </svg>

      <!-- STATIONS (HTML Interactive Nodes) -->
      {#each stations as station, index}
        <a
          href={station.href}
          class="station-node absolute z-10 flex flex-col items-center group cursor-pointer"
          style="left: {station.x}%; top: {station.y}px;"
        >
          <!-- Tooltip Description card (CDMX styled) -->
          <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 hidden group-hover:flex flex-col items-center z-30 w-64 pointer-events-none">
            <div class="bg-[#111827] text-white text-xs p-4 rounded-2xl shadow-xl border-2 border-brand/50 text-center space-y-1.5">
              <div class="flex items-center justify-center gap-1">
                <span class="text-[9px] text-brand font-black uppercase tracking-widest">Lección {index + 1}</span>
                <Sparkles size={10} class="text-brand animate-pulse" />
              </div>
              <p class="font-black text-sm uppercase text-white tracking-wide">{station.name}</p>
              <p class="text-gray-300 font-bold leading-normal">{station.description}</p>
            </div>
            <!-- Tooltip pointer arrow -->
            <div class="w-3.5 h-3.5 bg-[#111827] border-r-2 border-b-2 border-brand/50 rotate-45 -mt-1.5"></div>
          </div>

          <!-- Emblem Icon Container -->
          <div class="relative">
            <!-- 3D shadow box -->
            <div class="absolute inset-0 bg-brand-dark rounded-3xl translate-y-1.5 transition-transform group-hover:translate-y-1 group-active:translate-y-0.5"></div>
            
            <!-- Emblem main card -->
            <div class="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-3xl border-4 border-brand flex items-center justify-center text-3xl sm:text-4xl shadow-inner relative z-10 transition-transform group-hover:-translate-y-0.5 group-active:translate-y-1 select-none">
              {station.icon}
            </div>
            
            <!-- Floating "Here" train indicator -->
            {#if index === 0}
              <div class="absolute -top-4 -right-4 bg-red-500 text-white font-black text-[10px] px-2.5 py-1 rounded-full border-2 border-white shadow-[0_2.5px_0_0_#b91c1c] uppercase tracking-wider animate-bounce z-20 flex items-center gap-0.5 select-none">
                <MapPin size={10} />
                <span>Aquí</span>
              </div>
            {/if}
          </div>

          <!-- Metro Station Label -->
          <div class="mt-4 bg-white border-2 border-gray-200 px-4 py-1.5 rounded-2xl shadow-[0_4px_0_0_#e5e7eb] text-center w-36 sm:w-44 group-hover:border-brand transition-colors relative z-10">
            <p class="text-[9px] font-black text-brand-dark uppercase tracking-widest mb-0.5">Estación</p>
            <p class="text-xs sm:text-sm font-black text-gray-900 leading-tight truncate uppercase tracking-tight">{station.name}</p>
          </div>
        </a>
      {/each}
    </div>

  </div>
</div>

<style>
  /* SVG train track animation */
  @keyframes train-move {
    to {
      stroke-dashoffset: -40px;
    }
  }

  .animate-train-line {
    stroke-dasharray: 8px 16px;
    animation: train-move 3s linear infinite;
  }

  /* Absolute centering of the station nodes on their target coordinate */
  .station-node {
    transform: translate(-50%, -50%) scale(1);
    transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .station-node:hover {
    transform: translate(-50%, -50%) scale(1.1);
  }

  .station-node:active {
    transform: translate(-50%, -50%) scale(0.95);
  }
</style>