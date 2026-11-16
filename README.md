# Radio TV Manantial 90.7 FM - Plataforma Web Oficial

Plataforma web modular, reactiva y de alto rendimiento desarrollada para la emisora comunitaria y cristiana **Radio TV Manantial 90.7 FM** ("La Voz que Edifica tu Vida").

---

## ⚡ Nueva Arquitectura & Stack Tecnológico

El proyecto ha sido modernizado a un stack profesional de vanguardia:

- **[Astro 5](https://astro.build/):** Generador de sitios estáticos de ultra-alta velocidad (arquitectura de islas). Optimiza el tiempo de carga a milisegundos en conexiones móviles.
- **[Tailwind CSS v4](https://tailwindcss.com/):** Compilación minificada mediante motor Vite (`@tailwindcss/vite`), pasando de un CDN de ~300 KB a menos de 40 KB de estilos purgados.
- **HTML5 Audio Engine & Icecast/Shoutcast Stream:** Reproductor de transmisión dual (Hero interactivo + barra flotante persistente) sintonizado a `https://radio.conectarservidor.com:8014/stream`.
- **Panel Administrativo del Director:** Módulo seguro para redactar noticias, devocionales y cambiar el cintillo de avisos de última hora.
- **GitHub Actions CI/CD:** Despliegue continuo automático a **GitHub Pages** en cada actualización del repositorio.

---

## 📂 Estructura del Proyecto

```text
RadioTVManantial/
├── .github/workflows/
│   └── deploy.yml          # Pipeline automático de compilación y despliegue a GitHub Pages
├── public/
│   └── assets/
│       └── logo_original.png
├── src/
│   ├── components/
│   │   ├── TopMarquee.astro      # Cintillo superior de estado y avisos al aire
│   │   ├── Header.astro          # Navegación y logo emblemático SVG
│   │   ├── HeroPlayer.astro      # Reproductor central con ecualizador animado
│   │   ├── Schedule.astro        # Parrilla de programación y programa en vivo de sábados
│   │   ├── Devotionals.astro     # Sección de noticias, devocionales y blog
│   │   ├── Directories.astro     # Enlaces a apps (MyTuner, Radios de Venezuela, TLC)
│   │   ├── PrayerContact.astro   # Formulario directo de peticiones a WhatsApp Cabina
│   │   ├── StickyPlayer.astro    # Reproductor persistente inferior con volumen
│   │   ├── AdminModal.astro      # Modal administrativo con clave para el Director
│   │   └── Footer.astro          # Pie de página institucional
│   ├── layouts/
│   │   └── Layout.astro          # Plantilla base, SEO, fuentes y Audio State Engine
│   ├── styles/
│   │   └── global.css            # Estilos globales y tokens del tema Tailwind v4
│   └── pages/
│       └── index.astro           # Página de inicio
├── astro.config.mjs              # Configuración de Astro y Vite
├── package.json
└── pnpm-lock.yaml
```

---

## 🛠️ Comandos de Desarrollo

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor local de desarrollo (http://localhost:4321/radio-tv-manantial)
pnpm dev

# Compilar para producción (genera la carpeta dist/)
pnpm build

# Previsualizar la compilación de producción localmente
pnpm preview
```

---

## 🌐 Enlaces Oficiales

- **Repositorio:** [github.com/royclar28/radio-tv-manantial](https://github.com/royclar28/radio-tv-manantial)
- **Sitio Web en Vivo:** [royclar28.github.io/radio-tv-manantial](https://royclar28.github.io/radio-tv-manantial/)
- **Streaming de Cabina:** `https://radio.conectarservidor.com:8014/stream`
