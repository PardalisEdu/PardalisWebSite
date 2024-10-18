<script>
    import Boton from "$lib/components/Boton.svelte";
    import {NavBar} from "$lib/components/index.js";

    let user = {
        name: 'Poncho',
        avatar: '/path/to/poncho-avatar.jpg',
        bio: 'Diseñador oficial de Pardalis y tomador profesional de Tonaýan. Fan número uno de la rata con tiner'
    };

    let progress = [
        { name: 'Lectura', level: 2, current: 30, total: 50, icon: '☕' },
        { name: 'Vocabulario', level: 1, current: 60, total: 100, icon: '🌍' },
        { name: 'Tecleado', level: 2, current: 40, total: 50, icon: '⭐' }
    ];
</script>

<NavBar />

<main class="min-h-screen bg-gray-100 py-12 px-4">
    <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div class="p-6">
            <div class="flex flex-col items-center mb-6">
                <img class="w-32 h-32 rounded-full mb-4" src={user.avatar} alt={user.name} />
                <h2 class="text-2xl font-bold">{user.name}</h2>
                <Boton title="Editar perfil" color="primary" />
            </div>

            <div class="mb-6">
                <h3 class="text-xl font-semibold mb-2">Sobre mí</h3>
                <p class="text-gray-600">{user.bio}</p>
            </div>

            <div>
                <h3 class="text-xl font-semibold mb-4">Mi progreso</h3>
                <div class="grid grid-cols-3 gap-4">
                    {#each progress as item}
                        <div class="border rounded-lg p-4 text-center">
                            <div class="text-3xl mb-2">{item.icon}</div>
                            <h4 class="font-semibold mb-1">{item.name}</h4>
                            <p class="text-sm text-gray-500">Level {item.level}: {item.current}/{item.total}</p>
                        </div>
                    {/each}
                </div>
            </div>
        </div>

        <div class="px-6 py-4 bg-gray-50">
            <Boton title="Cerrar Sesión" color="warn" />
        </div>
    </div>
</main>