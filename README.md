# Radio TV Manantial 90.7 FM - Plataforma Web Oficial

Plataforma web moderna, interactiva y responsiva desarrollada para la emisora comunitaria y cristiana **Radio TV Manantial 90.7 FM** ("La Voz que Edifica tu Vida").

## 🚀 Características Principales

- **Streaming en Vivo Dual:**
  - Reproductor principal interactivo en la sección de inicio (Hero) con ecualizador animado por barras.
  - Barra de reproducción inferior persistente (*sticky bar*) con control de volumen deslizante, botón de muteo y estado en vivo.
  - Conexión directa y fluida con servidor Shoutcast v2 con certificado SSL (`https://radio.conectarservidor.com:8014/stream`).
- **Parrilla de Programación:**
  - Horarios semanales detallados destacando la transmisión estelar de los sábados de 5:00 PM a 6:00 PM.
  - Filtros interactivos por días y etiqueta en tiempo real ("EN VIVO").
- **Sección de Devocionales y Noticias:**
  - Blog cristiano con publicaciones, reflexiones bíblicas y avisos parroquiales/comunitarios.
- **Panel de Control Administrativo (Dirección):**
  - Acceso seguro mediante clave de administración para el director de la emisora.
  - Permite publicar nuevos artículos/devocionales de manera instantánea.
  - Permite actualizar el cintillo de noticias y alertas en tiempo real sin tocar código.
- **Interacción y Peticiones de Oración:**
  - Formulario directo conectado a WhatsApp (`+58 422-6690007`) para recepción de testimonios, peticiones de oración y sintonía en vivo.
- **Directorios y Apps Externas:**
  - Enlaces directos a MyTuner Radio, Radios de Venezuela y TLC.

## 🛠️ Tecnologías Utilizadas

- **HTML5 Semántico & Audio API:** Integración nativa de streaming Icecast/Shoutcast de baja latencia.
- **Tailwind CSS (CDN):** Diseño vanguardista, responsivo y adaptado a móviles, tablets y computadoras de escritorio.
- **FontAwesome 6 & Google Fonts (Poppins / Inter):** Iconografía y tipografía moderna y legible.
- **Vanilla JavaScript (ES6+):** Lógica reactiva para persistencia en `localStorage`, eventos de audio y actualización dinámica del DOM.

## 📦 Despliegue

Este proyecto está optimizado como una Single Page Application (SPA) estática de alto rendimiento:
- Compatible con **GitHub Pages**, **Vercel**, **Netlify** o cualquier hosting Apache/Nginx.
- No requiere base de datos ni compilación previa.

---
*Desarrollado para Radio TV Manantial 90.7 FM.*
