# 📖 La Biblia Visual de Pardalis: Guía Maestra de Diseño 🐆🇲🇽

Este documento es la referencia definitiva para replicar la interfaz de usuario (UI) de Pardalis. Está diseñado para que cualquier desarrollador, incluso sin conocimiento previo del proyecto, pueda mantener la consistencia visual absoluta.

---

## 🎨 1. Paleta de Colores (The Color Map)

No usamos colores al azar. Cada color tiene un propósito semántico y una ubicación específica.

### A. Colores de Identidad (Brand)
Estos definen el "look & feel" cálido y energético.
*   **Amarillo Pardalis (Primary):** `#f9c710`
    *   *Uso:* Fondos de botones, logo, puntos de acento, banners destacados.
*   **Oro Tierra (Brand Dark):** `#d4a007`
    *   *Uso:* **Sombras sólidas 3D**, bordes de botones amarillos, estados "hover" oscurecidos.
*   **Crema Vainilla (Brand Light):** `#fef3c7`
    *   *Uso:* Fondos de banners secundarios, estados hover de navegación, fondos de tarjetas ligeras.
*   **Blanco Papel (Cream Background):** `#FFFDF5`
    *   *Uso:* **Fondo de toda la aplicación (`body`)**. Nunca uses `#FFFFFF` puro para el fondo general, ya que cansa la vista; usa este tono crema.

### B. Colores Funcionales
*   **Rojo Alerta (Warn/Error):** `#ff4136` (Sombra 3D: `#cc3333`)
    *   *Uso:* Botones de "Salir", mensajes de error, alertas críticas.
*   **Azul Cielo (Accent):** `#60a5fa`
    *   *Uso:* Elementos lúdicos decorativos, acentos en texto (como el punto final del logo).
*   **Verde Éxito:** `#10b981`
    *   *Uso:* Mensajes de "¡Correcto!", checkmarks, indicadores de progreso completado.

### C. Escala de Grises (Tipografía)
*   **Texto Principal:** `#374151` (Gris 700) - Suave pero legible.
*   **Títulos Fuertes:** `#111827` (Gris 900) - Casi negro, para máxima jerarquía.
*   **Texto Secundario/Muted:** `#6b7280` (Gris 500) - Para descripciones largas o pies de página.

---

## 字体 2. Tipografía (Typography)

La fuente oficial es **Rubik**. Es una fuente sans-serif con bordes ligeramente redondeados que encaja perfectamente con nuestro estilo.

*   **Importación:** Se encuentra localmente en `/static/fonts/Rubik.ttf`.
*   **Familia:** `Rubik, Arial, sans-serif`.

### Jerarquía de Tamaños y Pesos
| Elemento | Clase Tailwind | Peso (Weight) | Nota |
| :--- | :--- | :--- | :--- |
| **Logo PARDALIS** | `text-3xl` | `font-black` (900) | `tracking-tighter` para unir las letras. |
| **Títulos Grandes (H1)** | `text-4xl` | `font-extrabold` (800) | Usar en encabezados de página. |
| **Títulos de Sección (H2)**| `text-2xl` | `font-bold` (700) | Para separar bloques de contenido. |
| **Cuerpo de Texto** | `text-base` (16px)| `font-normal` (400) | En escritorio puede subir a `text-lg`. |
| **Botones** | `text-lg` | `font-black` (900) | Siempre en mayúsculas o con mucho peso. |

---

## 🧱 3. El Lenguaje de las Formas (Shapes & Shadows)

### A. Bordes Redondeados (The "Round" Rule)
Nada en Pardalis termina en punta. Usamos radios de borde muy generosos:
*   **Tarjetas Grandes:** `rounded-[2.5rem]` (40px).
*   **Botones y Inputs:** `rounded-2xl` (16px).
*   **Contenedores de Navegación:** `rounded-3xl` (24px).

### B. El Efecto 3D (Signature Shadow)
Es nuestra marca registrada. No usamos sombras difusas (`blur`), usamos **sombras sólidas**.

**Cómo construir un elemento 3D:**
1.  **Fondo:** Un color sólido (ej. Amarillo `#f9c710`).
2.  **Sombra:** Una sombra inferior sin difuminado.
    *   `box-shadow: 0 4px 0 0 #d4a007;` (Sombras pequeñas).
    *   `box-shadow: 0 10px 0 0 #d4a007;` (Sombras grandes para tarjetas).
3.  **Interacción (Hover):**
    *   El elemento baja: `transform: translateY(4px);`
    *   La sombra desaparece: `box-shadow: none;`
    *   *Resultado:* Parece que el botón se hunde físicamente.

---

## ✨ 4. Animaciones y Micro-interacciones

La web debe sentirse "elástica" y juguetona.

### A. Movimientos de Reposo
*   **Float:** Para personajes o iconos importantes. Sube y baja 20px cada 6 segundos.
*   **Wiggle:** Un pequeño temblor de 3 grados para elementos que necesitan atención.

### B. Feedback Táctil (Svelte Motion)
Usamos "Spring Physics" (física de resorte). Cuando tocas un botón:
*   Se agranda un poco (`scale: 1.1`).
*   Gira ligeramente (`rotate: 5deg`).
*   Regresa a su forma original con un rebote suave.
*   *Configuración técnica:* `stiffness: 0.1`, `damping: 0.2`.

---

## 📝 5. Estándares para Contenido (Blog/Artículos)

Cuando escribas contenido largo (clase `.prose-blog`), sigue estas reglas:

*   **Interlineado:** `1.8` (amplio para que los niños lean sin perderse).
*   **Citas:**
    ```css
    border-left: 4px solid #f9c710;
    background: #fffbeb;
    padding: 1rem 1.5rem;
    border-radius: 0 1rem 1rem 0;
    ```
*   **Imágenes:** Siempre con esquinas redondeadas (`rounded-2xl`) y una sombra suave para separarlas del fondo.

---

## 📱 6. Diseño Responsivo (Mobile First)

*   **Navegación:** En móviles se convierte en un menú "hamburguesa" que despliega un panel lateral desde arriba.
*   **Espaciado:**
    *   Móvil: `p-4` (16px).
    *   Escritorio: `p-8` o `p-12` (32px - 48px).
*   **Contenedor Máximo:** Las secciones nunca deben exceder los `max-w-7xl` (1280px) para mantener la legibilidad.

---

## 📐 7. Grillas y Espaciado (Layout & Spacing)

Para mantener el ritmo visual, usamos una escala basada en **4px**.

*   **Contenedor Principal:** `max-w-7xl` (1280px) centrado con `mx-auto`.
*   **Separación entre Secciones:** `py-12` (48px) en móvil, `py-24` (96px) en escritorio.
*   **Gaps (Espacios entre elementos):**
    *   Elementos pequeños (botones en grupo): `gap-3` (12px).
    *   Tarjetas en grilla: `gap-6` (24px).
    *   Bloques de texto: `space-y-4` (16px).

### Grillas Comunes:
*   **Tarjetas (Blog/Juegos):** `grid-cols-1` (móvil) → `grid-cols-2` (tablet) → `grid-cols-3` (desktop).

---

## 🎨 8. Iconografía (Icons)

Usamos **Lucide Svelte** como librería base.

*   **Grosor de trazo (Stroke Width):** Siempre `2px`.
*   **Color:** Nunca negro puro. Usar `text-gray-700` o colores de la marca (`text-brand-dark`).
*   **Tamaño estándar:** `h-6 w-6` para UI general, `h-5 w-5` dentro de botones.
*   **Estilo:** Iconos amigables y redondeados. Evitar iconos con ángulos rectos muy agresivos.

---

## 🛠️ 9. Glosario de Clases CSS Clave (Tailwind v4)

Si estás usando Tailwind, estas son tus herramientas más frecuentes:

*   `bg-brand`: `#f9c710`
*   `text-brand-dark`: `#d4a007`
*   `bg-cream`: `#FFFDF5`
*   `rounded-card`: `2.5rem`
*   `shadow-3d-md`: `0 6px 0 0 var(--color-brand-dark)`
*   `animate-float`: Movimiento arriba/abajo infinito.

---
*Si sigues esta guía, cualquier cosa que construyas parecerá parte oficial del universo Pardalis. Recuerda: **Si no es redondeado, si no es cálido y si no tiene un toque de juego, no es Pardalis.***
