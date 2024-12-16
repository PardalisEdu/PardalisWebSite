<script lang="ts">
  interface TacoType {
    name: string;
    emoji: string;
    english: string;
  }

  interface Customer {
    name: string;
    emoji: string;
    phrases: string[];
  }

  interface Order {
    type: TacoType;
    quantity: number;
    withVegetables: boolean;
    withSalsa: boolean;
  }

  interface PreparedTaco {
    type: string;
    withVegetables: boolean;
    withSalsa: boolean;
  }

  interface TacoPreparation {
    type: string;
    withVegetables: boolean;
    withSalsa: boolean;
    quantity: number;
  }

  const tacoTypes: Record<string, TacoType> = {
    SUADERO: { name: "Suadero", emoji: "🥩", english: "Brisket" },
    LONGANIZA: { name: "Longaniza", emoji: "🌭", english: "Sausage" },
    PASTOR: { name: "Al Pastor", emoji: "🍖", english: "Marinated Pork" },
    CAMPECHANO: { name: "Campechano", emoji: "🥩🌭", english: "Mixed Meat" },
    LENGUA: { name: "Lengua", emoji: "👅", english: "Beef Tongue" },
  };

  const customers: Customer[] = [
    {
      name: "John",
      emoji: "👨🏻",
      phrases: [
        "Hello! I'd like some tacos please!",
        "Could I get some sauce with that?",
        "Thank you, señor!",
      ],
    },
    {
      name: "Emily",
      emoji: "👩🏼",
      phrases: [
        "I heard these are the best tacos!",
        "No vegetables for me, please",
        "Gracias!",
      ],
    },
    {
      name: "Mike",
      emoji: "👨🏾",
      phrases: [
        "I want to try everything!",
        "Extra spicy please!",
        "¡Delicioso!",
      ],
    },
  ];

  let currentOrder: Order | null = null;
  let currentCustomer: Customer | null = null;
  let score: number = 0;
  let lives: number = 3;
  let orderInProgress: boolean = false;
  let tacoPreparation: TacoPreparation = {
    type: "",
    withVegetables: false,
    withSalsa: false,
    quantity: 0,
  };
  let preparedTacos: PreparedTaco[] = [];
  let message: string = "";
  let messageType: "info" | "success" | "error" = "info";

  function generateOrder(): void {
    const customer = customers[Math.floor(Math.random() * customers.length)];
    const tacoType =
      Object.values(tacoTypes)[
        Math.floor(Math.random() * Object.values(tacoTypes).length)
      ];
    const quantity = Math.floor(Math.random() * 7) + 1;
    const withVegetables = Math.random() > 0.5;
    const withSalsa = Math.random() > 0.5;

    currentCustomer = customer;
    currentOrder = {
      type: tacoType,
      quantity,
      withVegetables,
      withSalsa,
    };

    orderInProgress = true;
    preparedTacos = [];
  }

  function prepareTaco(): void {
    if (preparedTacos.length >= 8) {
      showMessage("¡No puedes preparar más de 8 tacos!", "error");
      return;
    }

    const taco: PreparedTaco = {
      type: tacoPreparation.type,
      withVegetables: tacoPreparation.withVegetables,
      withSalsa: tacoPreparation.withSalsa,
    };

    preparedTacos = [...preparedTacos, taco];
  }

  function deliverOrder(): void {
    if (!currentOrder) return;

    const isCorrect =
      preparedTacos.every(
        (taco) =>
          taco.type === currentOrder!.type.name &&
          taco.withVegetables === currentOrder!.withVegetables &&
          taco.withSalsa === currentOrder!.withSalsa,
      ) && preparedTacos.length === currentOrder.quantity;

    if (isCorrect) {
      score += 10;
      showMessage("¡Pedido correcto! +10 puntos", "success");
    } else {
      lives--;
      showMessage("Pedido incorrecto... -1 vida", "error");
    }

    setTimeout(() => {
      if (lives > 0) {
        generateOrder();
      } else {
        gameOver();
      }
    }, 2000);
  }

  function showMessage(msg: string, type: "info" | "success" | "error"): void {
    message = msg;
    messageType = type;
    setTimeout(() => {
      message = "";
    }, 2000);
  }

  function gameOver(): void {
    orderInProgress = false;
    currentOrder = null;
    message = `¡Juego terminado! Puntuación final: ${score}`;
    messageType = "info";
  }

  function startGame(): void {
    score = 0;
    lives = 3;
    generateOrder();
  }

  startGame();
</script>

<div
  class="min-h-screen bg-gradient-to-b from-orange-100 to-orange-200 pt-24 px-4 mt-10"
>
  <div class="max-w-4xl mx-auto">
    <div class="text-center mb-8">
      <h1 class="text-4xl md:text-6xl font-bold text-orange-800 mb-4">
        Tacos el Güero 🌮
      </h1>

      <div class="flex justify-center gap-8 text-lg font-bold">
        <div class="bg-white px-6 py-3 rounded-xl shadow-lg">
          Score: {score}
        </div>
        <div class="bg-white px-6 py-3 rounded-xl shadow-lg">
          Lives: {"❤️".repeat(lives)}
        </div>
      </div>
    </div>

    {#if orderInProgress}
      <div class="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div class="flex items-center gap-4 mb-6">
          <div class="text-4xl">{currentCustomer?.emoji}</div>
          <div>
            <h3 class="text-xl font-bold">{currentCustomer?.name}</h3>
            <p class="text-gray-600">
              I want {currentOrder?.quantity}
              {currentOrder?.type.english} taco{currentOrder?.quantity &&
              currentOrder.quantity > 1
                ? "s"
                : ""}
              {currentOrder?.withVegetables ? "with" : "without"} vegetables,
              {currentOrder?.withSalsa ? "with" : "without"} salsa
            </p>
            <p class="text-sm text-gray-500">
              ({currentOrder?.quantity} taco{currentOrder?.quantity &&
              currentOrder.quantity > 1
                ? "s"
                : ""} de {currentOrder?.type.name}
              {currentOrder?.withVegetables ? "con" : "sin"} verdura,
              {currentOrder?.withSalsa ? "con" : "sin"} salsa)
            </p>
          </div>
        </div>

        <div class="bg-orange-50 rounded-xl p-6 mb-6">
          <h3 class="text-lg font-bold mb-4">Preparar Taco:</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {#each Object.entries(tacoTypes) as [key, taco]}
              <button
                class="p-4 rounded-lg border-2 transition-colors"
                class:border-orange-500={tacoPreparation.type === taco.name}
                class:border-gray-200={tacoPreparation.type !== taco.name}
                onclick={() => (tacoPreparation.type = taco.name)}
              >
                <div class="text-2xl mb-1">{taco.emoji}</div>
                <div class="text-sm font-medium">{taco.name}</div>
              </button>
            {/each}
          </div>

          <div class="flex gap-4 mb-4">
            <label class="flex items-center gap-2">
              <input
                type="checkbox"
                bind:checked={tacoPreparation.withVegetables}
                class="w-4 h-4"
              />
              Verdura 🥬
            </label>
            <label class="flex items-center gap-2">
              <input
                type="checkbox"
                bind:checked={tacoPreparation.withSalsa}
                class="w-4 h-4"
              />
              Salsa 🌶️
            </label>
          </div>

          <button
            class="bg-orange-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-orange-600 transition-colors disabled:opacity-50"
            onclick={prepareTaco}
            disabled={!tacoPreparation.type}
          >
            Preparar Taco 🌮
          </button>
        </div>

        <div class="mb-6">
          <h3 class="text-lg font-bold mb-2">Tacos Preparados:</h3>
          <div class="flex gap-2 flex-wrap">
            {#each preparedTacos as taco, i}
              <div class="bg-orange-100 p-2 rounded-lg flex items-center gap-1">
                <span
                  >{Object.values(tacoTypes).find((t) => t.name === taco.type)
                    ?.emoji}</span
                >
                {#if taco.withVegetables}
                  <span>🥬</span>
                {/if}
                {#if taco.withSalsa}
                  <span>🌶️</span>
                {/if}
              </div>
            {/each}
          </div>
        </div>

        <button
          class="w-full bg-green-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-600 transition-colors"
          onclick={deliverOrder}
          disabled={preparedTacos.length === 0}
        >
          ¡Entregar Pedido! 🚀
        </button>
      </div>
    {:else}
      <div class="text-center">
        <h2 class="text-3xl font-bold mb-4">¡Juego terminado!</h2>
        <p class="text-xl mb-6">Puntuación final: {score}</p>
        <button
          class="bg-orange-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors"
          onclick={startGame}
        >
          Jugar de nuevo 🔄
        </button>
      </div>
    {/if}

    {#if message}
      <div
        class="fixed bottom-4 right-4 p-4 rounded-lg shadow-lg"
        class:bg-green-500={messageType === "success"}
        class:bg-red-500={messageType === "error"}
        class:bg-blue-500={messageType === "info"}
      >
        <p class="text-white font-bold">{message}</p>
      </div>
    {/if}
  </div>
</div>
