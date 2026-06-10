# 🚫 Lo Que NO Hacer en Pardalis: Guía de Antipatrones 🐆🇲🇽

Para proteger la esencia de Pardalis, existen límites claros. Si una propuesta rompe estas reglas, **no es Pardalis.**

---

## 🎨 1. Errores Visuales (UI/UX)

*   **❌ NO usar bordes rectos:** Evita esquinas de 90°. Si un elemento no es redondeado (`rounded-2xl` mínimo), se siente agresivo para un niño.
*   **❌ NO usar sombras difusas (Blur):** No uses `shadow-lg` estándar con desenfoque. Pardalis usa sombras sólidas y duras para el efecto 3D.
*   **❌ NO usar Blanco Puro (#FFFFFF) de fondo:** El fondo debe ser siempre Crema (`#FFFDF5`). El blanco puro es muy brillante y "aburrido".
*   **❌ NO saturar de texto:** Si una sección parece un testamento, bórrala. Usa iconos, tarjetas y espacios en blanco.
*   **❌ NO usar animaciones lentas:** Las animaciones deben ser rápidas y con rebote (`spring`). Animaciones lineales o lentas hacen que la web se sienta pesada.

---

## 🎓 2. Errores Pedagógicos y de Contenido

*   **❌ NO usar contextos extranjeros:** Prohibido usar ejemplos como "London Eye", "Yellow Cabs" o "Halloween" como centro de la lección. Todo debe ser local: el tianguis, el zócalo, la kermés.
*   **❌ NO usar lenguaje técnico/académico:** No digas "Adquisición fonética del morfema". Di "Aprende a pronunciar como un jaguar".
*   **❌ NO penalizar el error:** No uses sonidos de "X" roja estridente o mensajes de "Fallaste". Usa pistas y mensajes de "¡Inténtalo de nuevo, tú puedes!".
*   **❌ NO crear competencia tóxica:** No hagas tablas de clasificación globales donde los niños se sientan mal por estar "abajo". La progresión es personal.

---

## 💼 3. Errores Éticos y de Negocio

*   **❌ NO poner anuncios:** Nunca. Ni siquiera de "socios educativos". Pardalis es un espacio limpio.
*   **❌ NO pedir datos sensibles:** No pidas apellidos, correos de los niños o su ubicación exacta. La privacidad es sagrada (cumplir COPPA).
*   **❌ NO usar Dark Patterns:** No uses trucos para que el niño se quede conectado más tiempo del debido o botones engañosos para "comprar" cosas (aunque sean virtuales).
*   **❌ NO priorizar el escritorio sobre el móvil:** Muchos niños usarán la tablet de sus padres o el celular. Si no funciona en touch, no sirve.

---

## 🛠️ 4. Errores Técnicos

*   **❌ NO importar librerías pesadas:** Cada KB cuenta. Si puedes hacerlo con CSS o Svelte puro, no instales un paquete de NPM.
*   **❌ NO ignorar la accesibilidad:** No uses colores con poco contraste. El amarillo debe tener texto oscuro (`text-gray-900`) para ser legible.
*   **❌ NO dejar estados de carga vacíos:** Si algo tarda en cargar, pon un esqueleto (`skeleton`) o un jaguar corriendo. Nunca una pantalla en blanco.

---
*Pardalis es un refugio educativo. Si parece una aplicación corporativa gris o un juego adictivo de casino, cámbialo.*
