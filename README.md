# Radio TV Manantial 90.7 FM - Plataforma Web Oficial

Plataforma web modular, reactiva y de alto rendimiento desarrollada para la emisora comunitaria y cristiana **Radio TV Manantial 90.7 FM** ("La Voz que Edifica tu Vida").

---

## ⚡ Arquitectura & Stack Tecnológico

- **[Astro 5](https://astro.build/):** Generador de sitios estáticos de ultra-alta velocidad (arquitectura de islas). Optimiza el tiempo de carga a milisegundos en conexiones móviles.
- **[Tailwind CSS v4](https://tailwindcss.com/):** Compilación minificada mediante motor Vite (`@tailwindcss/vite`), pasando de un CDN de ~300 KB a menos de 40 KB de estilos purgados.
- **[Supabase](https://supabase.com/) (PostgreSQL & Auth en la Nube):**
  - Base de datos en la nube para persistencia global de publicaciones, devocionales y avisos.
  - Canales en tiempo real (*Realtime WebSockets*): cuando el director publica, se actualiza en las pantallas de todos los oyentes sin recargar.
  - Autenticación segura de Director (JWT cifrado).
  - Modo híbrido de contingencia: si no hay conexión a internet o Supabase no está configurado, funciona automáticamente con almacenamiento local (`localStorage`).
- **HTML5 Audio Engine & Icecast/Shoutcast Stream:** Reproductor de transmisión dual (Hero interactivo + barra flotante persistente) sintonizado a `https://radio.conectarservidor.com:8014/stream`.
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
│   │   ├── TopMarquee.astro      # Cintillo superior de avisos al aire
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
│   │   └── Layout.astro          # Plantilla base y SEO
│   ├── scripts/
│   │   └── radioEngine.js        # Motor de streaming, estado y sincronización Supabase
│   ├── styles/
│   │   └── global.css            # Tokens del tema Tailwind v4 y animaciones
│   └── pages/
│       └── index.astro           # Página de inicio
├── supabase/
│   └── schema.sql                # Script SQL para crear tablas, RLS y datos iniciales en Supabase
├── .env.example                  # Plantilla de variables de entorno
├── astro.config.mjs              # Configuración de Astro y Vite
├── package.json
└── pnpm-lock.yaml
```

---

## 🗄️ Configuración de Supabase (Paso a Paso)

1. **Crear Proyecto en Supabase:**
   - Ingresa en [supabase.com](https://supabase.com) y crea un nuevo proyecto gratuito.
2. **Crear Tablas y Permisos:**
   - Ve a la sección **SQL Editor** en el panel de Supabase.
   - Pega y ejecuta el contenido completo del archivo [`supabase/schema.sql`](file:///home/roy-daniel-ramos-calderon/Documentos/Desarrollos/SCBS/RadioTVManantial/supabase/schema.sql).
3. **Obtener las Claves de API:**
   - En Supabase ve a **Project Settings** > **API**.
   - Copia la `Project URL` y la clave pública `anon` `public`.
4. **Configurar Variables de Entorno:**
   - Crea un archivo `.env` en la raíz del proyecto basándote en [`.env.example`](file:///home/roy-daniel-ramos-calderon/Documentos/Desarrollos/SCBS/RadioTVManantial/.env.example):
     ```env
     PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
     PUBLIC_SUPABASE_ANON_KEY=tu-clave-anon
     ```
5. **Crear Usuario para el Director:**
   - En Supabase ve a **Authentication** > **Users** > **Add User** y crea la cuenta del Director con su correo y contraseña.

---

## 🛠️ Comandos de Desarrollo

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor local de desarrollo (http://localhost:4321/radio-tv-manantial)
pnpm dev

# Compilar para producción
pnpm build

# Previsualizar localmente la versión de producción
pnpm preview
```

---

## 🌐 Enlaces Oficiales

- **Repositorio:** [github.com/royclar28/radio-tv-manantial](https://github.com/royclar28/radio-tv-manantial)
- **Sitio Web en Vivo:** [royclar28.github.io/radio-tv-manantial](https://royclar28.github.io/radio-tv-manantial/)
- **Streaming de Cabina:** `https://radio.conectarservidor.com:8014/stream`
