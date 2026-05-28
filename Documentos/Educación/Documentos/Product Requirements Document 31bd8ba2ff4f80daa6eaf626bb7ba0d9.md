# Product Requirements Document

# Documento de Requisitos del Producto (PRD)

**Producto:** Plataforma Educativa "Pardalis"

**Fase:** MVP (Producto Mínimo Viable)

**Entorno de Staging:** `dev.pardalis.mx`

**Fecha:** 6 de marzo de 2026

## 1. Objetivo del Documento

Definir los requisitos funcionales, no funcionales y técnicos para la primera versión (MVP) de Pardalis. El objetivo de este release es validar la hipótesis principal: que los niños de primaria en México aprenden inglés con mayor facilidad e interés cuando las lecciones están ancladas en su contexto cultural y cotidiano.

## 2. Requisitos Funcionales (Características del MVP)

### 2.1. Módulo del Estudiante (Niños)

- **Registro/Login Simplificado:** Acceso mediante un código de clase proporcionado por el profesor o un registro rápido gestionado por un tutor.
- **Navegación Lúdica:** Un mapa interactivo que represente un vecindario mexicano (con locaciones como "La Tortillería", "El Mercado", "La Papelería").
- **Lecciones Interactivas:**
    - **Vocabulario Contextual:** Ejercicios de arrastrar y soltar, emparejar imágenes con palabras y escuchar pronunciaciones basadas en el entorno (ej. *How much is a kilo of tortillas?*).
    - **Asistente Virtual:** Un personaje o mascota guía (por ejemplo, un gato amigable) que acompañe al niño durante los ejercicios, dando retroalimentación positiva y pistas cuando se equivoquen.
- **Sistema de Recompensas Básicas:** Emblemas o "sellos" virtuales al completar locaciones del vecindario.

### 2.2. Módulo del Profesor (Facilitador)

- **Panel de Control (Dashboard):** Vista general para crear "Clases" y generar códigos de acceso para los alumnos.
- **Seguimiento de Progreso:** Visualización del avance de cada alumno (qué locaciones del mapa han completado y dónde tienen dificultades).
- **Asignación de Misiones:** Capacidad de recomendar una locación específica (ej. "Esta semana todos completan El Mercado") para alinear la plataforma con su clase presencial.

## 3. Requisitos No Funcionales y Arquitectura Técnica

Para mantener la plataforma rápida, escalable y alineada con un desarrollo Full Stack moderno, se establecen las siguientes directrices técnicas:

- **Frontend (Interfaz de Usuario):** Se utilizará **Svelte**. Su naturaleza ligera y reactiva es ideal para crear las interfaces dinámicas, animadas y amigables que requieren los niños sin sobrecargar el navegador.
- **Backend (Lógica y API):** Arquitectura basada en microservicios o monolito modular utilizando **Python (FastAPI)** o **Go**, garantizando un manejo eficiente de las peticiones concurrentes (especialmente cuando grupos enteros de niños se conecten al mismo tiempo desde un salón de clases).
- **Infraestructura y Despliegue:**
    - Contenerización de todos los servicios utilizando **Docker**.
    - Gestión del despliegue y self-hosting a través de **Coolify**, permitiendo despliegues continuos y administración de base de datos de forma independiente y económica (alineado al principio de no priorizar el lucro).
- **Diseño Responsivo:** La plataforma debe funcionar fluidamente tanto en computadoras de escritorio (comunes en laboratorios de cómputo escolar) como en tabletas.

## 4. Supuestos y Restricciones

- **Conectividad:** Se asume que las escuelas o los hogares tienen conexión a internet, aunque la aplicación debe ser lo suficientemente ligera para cargar en conexiones de banda ancha baja.
- **Privacidad (COPPA/Legislación Local):** Al estar dirigida a menores de edad, la plataforma no debe recopilar datos personales sensibles de los niños (nombres completos, ubicaciones reales, correos electrónicos propios).

## 5. Criterios de Éxito (Métricas del MVP)

1. **Tasa de Retención:** Porcentaje de niños que regresan a completar una segunda "locación" en el mapa.
2. **Adopción Docente:** Número de profesores que crean una clase y logran que al menos 5 alumnos se unan con su código.
3. **Tiempo de Sesión:** Lograr sesiones promedio de 10 a 15 minutos (tiempo ideal para mantener la atención de un niño en primaria sin fatigarlo).