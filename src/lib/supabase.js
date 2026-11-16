import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://tu-proyecto.supabase.co'
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Posts iniciales de respaldo por si Supabase no está configurado aún o está vacío
export const DEFAULT_POSTS = [
  {
    id: 1,
    title: "Ríos de Agua Viva para Todas las Naciones",
    category: "Devocional",
    verse: "Juan 7:38",
    content: "El Señor nos promete que aquellos que creen en Él, no pasarán sed jamás, sino que de su interior brotarán manantiales de esperanza y consuelo. Que la paz del Padre llene hoy tu hogar a través de nuestra sintonía.",
    created_at: new Date().toISOString()
  },
  {
    id: 2,
    title: "Bienvenidos a Nuestra Señal Global Online",
    category: "Noticia",
    verse: "Salmos 100:1",
    content: "Damos gracias a Dios por abrir los canales digitales para que la voz de Manantial 90.7 FM cruce fronteras. Si te encuentras fuera de Venezuela, salúdanos a través del botón de WhatsApp en cabina.",
    created_at: new Date().toISOString()
  },
  {
    id: 3,
    title: "Programa Especial en Vivo: Sábados 5:00 PM",
    category: "Evento",
    verse: "1 Tesalonicenses 5:17",
    content: "No te pierdas cada sábado nuestro programa central en directo de 5 a 6 de la tarde. Estaremos orando por tus peticiones familiares y de salud en tiempo real.",
    created_at: new Date().toISOString()
  }
];

export const DEFAULT_MARQUEE = '"Ríos de agua viva para salvación" • Sintonízanos en el dial 90.7 FM y señal online 24/7';
