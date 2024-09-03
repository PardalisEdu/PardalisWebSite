<script>
  // 🐄 Contador épico de muus... ¡porque necesitamos saber cuántos muus has hecho en tu vida! 🐄
  let count = 0;

  /**
   * 🐄 Función legendaria que hace que tu navegador diga "MuuUuu" y aumente el contador de muus. 🐄
   *
   * Esta función es tan poderosa que no podrás resistirte a hacer "MuuUuu" una y otra vez. 🐄
   */
  function moo() {
    alert("MuuUuu"); // 🐄 La llamada del vaquero internauta. ¡Advertencia: puede ser adictivo! 😂
    count++; // 🐄 Aumenta el contador de muus... ¡porque siempre se puede tener más muus! 🐄
  }
</script>

<!-- 🐄 El botón más importante del universo. Haz clic y siente la magia del "MuuUuu". -->
<button on:click={moo}> 🐄 </button>

<!-- 🐄 Informativo: Porque necesitas saber cuántos muus llevas en tu vida. -->
<p>Has hecho {count} muus.</p>
