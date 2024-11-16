# Guía de Contribución a Pardalis Frontend

Gracias por tu interés en contribuir a Pardalis. Esta guía te ayudará a entender nuestro proceso de contribución y nuestras convenciones de código.

## Convenciones de Commits

Utilizamos una estructura específica para nuestros mensajes de commit que ayuda a mantener un historial claro y comprensible:

```
[Acción] Descripción concisa

Cuerpo detallado del commit (opcional pero recomendado para cambios significativos)
```

### Acciones Permitidas:

- **[Añadido]**: Nuevo código o funcionalidad
- **[Corregido]**: Corrección de errores
- **[Eliminado]**: Eliminación de código o funcionalidad
- **[Característica]**: Nueva característica completa
- **[Formateado]**: Cambios en el formato del código
- **[Documentado]**: Cambios en la documentación

### Ejemplos:

```
[Añadido] Componente de botón personalizado

Se agregó un nuevo componente de botón reutilizable con las siguientes características:
- Animaciones al hacer hover
- Soporte para diferentes tamaños
- Variantes de color configurables
```

```
[Corregido] Error en la validación del formulario de registro

- Se corrigió la validación de correo electrónico
- Se mejoró el manejo de errores
```

```
[Característica] Sistema de autenticación completo

Implementación del sistema de autenticación incluyendo:
- Login/Registro de usuarios
- Recuperación de contraseña
- Persistencia de sesión
- Protección de rutas
```

## Proceso de Contribución

1. **Fork y Clone**
   ```bash
   git clone https://github.com/tu-usuario/PardalisWeb.git
   cd PardalisWeb
   ```

2. **Crear Rama**
   ```bash
   git checkout -b [tipo]/[descripcion-breve]
   ```
   Ejemplo: `feature/auth-system` o `fix/login-validation`

3. **Desarrollo**
    - Escribe código limpio y mantenible
    - Sigue las convenciones de estilo existentes
    - Documenta las funciones y componentes nuevos

4. **Commits**
    - Haz commits frecuentes y significativos
    - Sigue la estructura de mensajes definida
    - Incluye cuerpos detallados cuando sea necesario

5. **Pull Request**
    - Actualiza tu rama con main antes de crear el PR
    - Proporciona una descripción clara de los cambios
    - Referencia cualquier issue relacionado

## Convenciones de Código

### Nombres de Archivos

- Componentes: `PascalCase.svelte`
- Utilidades: `camelCase.js`
- Estilos: `kebab-case.css`

### Estructura de Componentes

```svelte
<script>
    // Imports primero
    import { onMount } from 'svelte';
    
    // Props después
    export let title;
    
    // Estado local
    let count = 0;
    
    // Funciones
    function handleClick() {
        count += 1;
    }
</script>

<!-- Markup -->
<div class="container">
    <h1>{title}</h1>
    <button on:click={handleClick}>
        Count: {count}
    </button>
</div>

<style>
    .container {
        /* estilos */
    }
</style>
```

## Pruebas

- Escribe pruebas para nueva funcionalidad
- Asegúrate de que todas las pruebas pasen antes de hacer commit
- Actualiza las pruebas existentes si es necesario

## Revisión de Código

Tu PR será revisado considerando:
- Calidad del código
- Adherencia a las convenciones
- Documentación apropiada
- Pruebas adecuadas

## Recomendaciones Finales

- Mantén los cambios enfocados y coherentes
- Documenta cualquier cambio en la API o comportamiento
- Actualiza el README si es necesario
- Sé respetuoso en las discusiones y comentarios

---

🍪 Por leer toda la guía de contribución, te has ganado una galleta virtual.