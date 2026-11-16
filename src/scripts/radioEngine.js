import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';

const isCloudEnabled = Boolean(
    supabaseUrl && 
    supabaseAnonKey && 
    !supabaseUrl.includes('tu-proyecto.supabase.co')
);

const supabase = isCloudEnabled ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Mapa de respaldo para categorías cuando no hay conexión a Supabase
const CATEGORY_MAP = {
    1: { name: 'Devocional', color: 'amber' },
    2: { name: 'Noticia', color: 'sky' },
    3: { name: 'Evento', color: 'purple' }
};

// Estado Global de la Plataforma
window.AppRadioState = {
    streamUrl: "https://radio.conectarservidor.com:8014/stream",
    isPlaying: false,
    isAdmin: false,
    adminUser: null,
    isCloudActive: isCloudEnabled,
    marqueeText: '"Ríos de agua viva para salvación" • Sintonízanos en el dial 90.7 FM y señal online 24/7',
    posts: [
        {
            id: 1,
            title: "Ríos de Agua Viva para Todas las Naciones",
            category: "Devocional",
            badge_color: "amber",
            author_name: "Dirección Manantial",
            verse: "Juan 7:38",
            content: "El Señor nos promete que aquellos que creen en Él, no pasarán sed jamás, sino que de su interior brotarán manantiales de esperanza y consuelo. Que la paz del Padre llene hoy tu hogar a través de nuestra sintonía.",
            created_at: new Date().toISOString()
        },
        {
            id: 2,
            title: "Bienvenidos a Nuestra Señal Global Online",
            category: "Noticia",
            badge_color: "sky",
            author_name: "Dirección Manantial",
            verse: "Salmos 100:1",
            content: "Damos gracias a Dios por abrir los canales digitales para que la voz de Manantial 90.7 FM cruce fronteras. Si te encuentras fuera de Venezuela, salúdanos a través del botón de WhatsApp en cabina.",
            created_at: new Date().toISOString()
        },
        {
            id: 3,
            title: "Programa Especial en Vivo: Sábados 5:00 PM",
            category: "Evento",
            badge_color: "purple",
            author_name: "Dirección Manantial",
            verse: "1 Tesalonicenses 5:17",
            content: "No te pierdas cada sábado nuestro programa central en directo de 5 a 6 de la tarde. Estaremos orando por tus peticiones familiares y de salud en tiempo real.",
            created_at: new Date().toISOString()
        }
    ]
};

const audioElement = document.getElementById('radioAudioStream');

// Utilidad: Escapar cadenas HTML contra inyecciones XSS
window.escapeHTML = function(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};

// Utilidad: Sistema de Notificaciones Flotantes (Toasts)
window.showToast = function(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `p-3.5 rounded-2xl shadow-2xl border text-xs font-bold text-white flex items-center gap-2.5 transition-all pointer-events-auto ${type === 'success' ? 'bg-emerald-600 border-emerald-500' : (type === 'error' ? 'bg-rose-600 border-rose-500' : 'bg-slate-900 border-white/20')}`;
    toast.innerHTML = `
        <i class="fa-solid ${type === 'success' ? 'fa-circle-check text-emerald-200' : (type === 'error' ? 'fa-circle-exclamation text-rose-200' : 'fa-circle-info text-amber-300')} text-sm"></i>
        <span class="flex-1">${window.escapeHTML(message)}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 3200);
};

// ==============================================================================
// MOTOR DE AUDIO STREAMING
// ==============================================================================
window.togglePlayRadio = function() {
    if (!audioElement) return;

    if (window.AppRadioState.isPlaying) {
        audioElement.pause();
        window.setPlayerUI(false);
    } else {
        window.setConnectingUI();
        audioElement.src = window.AppRadioState.streamUrl + "?nocache=" + Date.now();
        audioElement.play()
            .then(() => {
                window.setPlayerUI(true);
                window.showToast("Conectado a la señal en vivo de Radio TV Manantial 90.7 FM", "success");
            })
            .catch((err) => {
                console.error("Error reproduciendo stream:", err);
                window.setPlayerUI(false);
                window.showToast("No se pudo iniciar la transmisión. Verifica tu conexión a internet.", "error");
            });
    }
};

window.setConnectingUI = function() {
    const statusText = document.getElementById('playerStatusText');
    if (statusText) {
        statusText.textContent = "CONECTANDO A CABINA...";
        statusText.className = "text-xs font-black uppercase tracking-wider text-amber-400";
    }
    const stickyStatus = document.getElementById('stickyStatus');
    if (stickyStatus) stickyStatus.textContent = "Conectando al servidor de streaming...";
};

window.setPlayerUI = function(playing) {
    window.AppRadioState.isPlaying = playing;
    const mainIcon = document.getElementById('mainPlayIcon');
    const headerIcon = document.getElementById('headerPlayIcon');
    const headerText = document.getElementById('headerPlayText');
    const stickyIcon = document.getElementById('stickyPlayIcon');
    const eq = document.getElementById('equalizerContainer');
    const statusText = document.getElementById('playerStatusText');
    const stickyStatus = document.getElementById('stickyStatus');
    const dot = document.getElementById('playerPulseDot');

    if (playing) {
        if (mainIcon) mainIcon.className = "fa-solid fa-pause";
        if (headerIcon) headerIcon.className = "fa-solid fa-pause";
        if (headerText) headerText.textContent = "Pausar Radio";
        if (stickyIcon) stickyIcon.className = "fa-solid fa-pause ml-0";
        if (eq) eq.classList.remove('paused-bars');
        if (statusText) {
            statusText.textContent = "TRANSMITIENDO EN VIVO (AL AIRE)";
            statusText.className = "text-xs font-black uppercase tracking-wider text-emerald-400";
        }
        if (stickyStatus) stickyStatus.textContent = "En Vivo • 90.7 FM y Señal Online";
        if (dot) dot.className = "w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse";
    } else {
        if (mainIcon) mainIcon.className = "fa-solid fa-play ml-1";
        if (headerIcon) headerIcon.className = "fa-solid fa-play";
        if (headerText) headerText.textContent = "Escuchar en Vivo";
        if (stickyIcon) stickyIcon.className = "fa-solid fa-play ml-0.5";
        if (eq) eq.classList.add('paused-bars');
        if (statusText) {
            statusText.textContent = "TRANSMISIÓN EN PAUSA";
            statusText.className = "text-xs font-black uppercase tracking-wider text-slate-400";
        }
        if (stickyStatus) stickyStatus.textContent = "Pausado • Haz clic para reanudar";
        if (dot) dot.className = "w-2.5 h-2.5 rounded-full bg-amber-400";
    }
};

window.changeVolume = function(val) {
    if (!audioElement) return;
    const num = parseFloat(val);
    audioElement.volume = num;
    const pct = Math.round(num * 100) + '%';
    const volumePercent = document.getElementById('volumePercent');
    if (volumePercent) volumePercent.textContent = pct;
    
    const muteIcon = document.getElementById('muteIcon');
    if (muteIcon) {
        if (num === 0) {
            muteIcon.className = "fa-solid fa-volume-xmark";
        } else if (num < 0.5) {
            muteIcon.className = "fa-solid fa-volume-low";
        } else {
            muteIcon.className = "fa-solid fa-volume-high";
        }
    }
};

window.toggleMute = function() {
    if (!audioElement) return;
    if (audioElement.volume > 0) {
        audioElement.dataset.lastVol = audioElement.volume;
        window.changeVolume(0);
        const slider = document.getElementById('volumeSlider');
        if (slider) slider.value = 0;
    } else {
        const prev = parseFloat(audioElement.dataset.lastVol || 0.8);
        window.changeVolume(prev);
        const slider = document.getElementById('volumeSlider');
        if (slider) slider.value = prev;
    }
};

// ==============================================================================
// SINCRONIZACIÓN SUPABASE (CLOUD) CON TABLAS MAESTRAS (3FN)
// ==============================================================================
async function loadPostsFromSource() {
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from('posts')
                .select(`
                    id,
                    title,
                    verse,
                    content,
                    created_at,
                    categories ( id, name, slug, badge_color ),
                    profiles ( id, full_name, role )
                `)
                .order('created_at', { ascending: false });

            if (error) throw error;
            if (data && data.length > 0) {
                window.AppRadioState.posts = data.map(p => ({
                    id: p.id,
                    title: p.title,
                    verse: p.verse,
                    content: p.content,
                    created_at: p.created_at,
                    category: p.categories?.name || 'Devocional',
                    badge_color: p.categories?.badge_color || 'amber',
                    author_name: p.profiles?.full_name || 'Radio TV Manantial'
                }));
                window.renderPosts();
                return;
            }
        } catch (err) {
            console.warn("Supabase fetch failed, falling back to local:", err);
        }
    }
    // Fallback local
    window.loadFromLocalStorage();
    window.renderPosts();
}

async function loadMarqueeFromSource() {
    if (supabase) {
        try {
            const { data, error } = await supabase
                .from('site_settings')
                .select('value')
                .eq('key', 'marquee_text')
                .single();

            if (error) throw error;
            if (data && data.value) {
                window.AppRadioState.marqueeText = data.value;
                const headerMarquee = document.getElementById('headerMarqueeText');
                if (headerMarquee) headerMarquee.textContent = data.value;
                return;
            }
        } catch (err) {
            console.warn("Supabase marquee fetch failed:", err);
        }
    }
}

// Configurar canales en tiempo real si Supabase está activo
function setupRealtimeListeners() {
    if (!supabase) return;

    supabase
        .channel('public:posts')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, () => {
            loadPostsFromSource();
            window.showToast("Nuevo devocional o noticia publicada en la emisora", "info");
        })
        .subscribe();

    supabase
        .channel('public:site_settings')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'site_settings' }, () => {
            loadMarqueeFromSource();
        })
        .subscribe();
}

// RENDERIZADO DE NOTICIAS & DEVOCIONALES
window.renderPosts = function() {
    const container = document.getElementById('postsContainer');
    if (!container) return;

    container.innerHTML = '';
    window.AppRadioState.posts.forEach((post) => {
        const safeTitle = window.escapeHTML(post.title);
        const safeCategory = window.escapeHTML(post.category || 'Devocional');
        const safeVerse = window.escapeHTML(post.verse);
        const safeContent = window.escapeHTML(post.content);
        const safeAuthor = window.escapeHTML(post.author_name || 'Radio TV Manantial');
        
        let dateFormatted = 'Hoy';
        if (post.created_at) {
            try {
                dateFormatted = new Date(post.created_at).toLocaleDateString('es-VE', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                });
            } catch (e) {
                dateFormatted = 'Reciente';
            }
        }

        const color = post.badge_color || (post.category === 'Noticia' ? 'sky' : (post.category === 'Evento' ? 'purple' : 'amber'));
        const badgeColor = color === 'sky' 
            ? "bg-sky-500/20 text-sky-300 border-sky-500/30" 
            : (color === 'purple' 
                ? "bg-purple-500/20 text-purple-300 border-purple-500/30" 
                : "bg-amber-500/20 text-amber-300 border-amber-500/30");

        let adminButtons = '';
        if (window.AppRadioState.isAdmin) {
            adminButtons = `
                <div class="pt-2 border-t border-white/10 flex justify-end">
                    <button type="button" onclick="window.deletePost('${post.id}')" class="text-rose-400 hover:text-rose-300 text-xs font-bold transition cursor-pointer">
                        <i class="fa-solid fa-trash mr-1"></i> Eliminar
                    </button>
                </div>
            `;
        }

        container.innerHTML += `
            <article class="bg-celestial-900 border border-white/10 rounded-2xl p-6 flex flex-col justify-between space-y-4 hover:border-amber-400/40 transition group">
                <div class="space-y-2.5">
                    <div class="flex items-center justify-between">
                        <span class="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${badgeColor}">
                            ${safeCategory}
                        </span>
                        ${safeVerse ? `<span class="text-[11px] font-bold text-amber-300 flex items-center gap-1"><i class="fa-solid fa-bible"></i> ${safeVerse}</span>` : ''}
                    </div>
                    <h3 class="font-display font-black text-lg text-white group-hover:text-amber-300 transition">
                        ${safeTitle}
                    </h3>
                    <p class="text-xs text-slate-300 leading-relaxed font-normal">
                        ${safeContent}
                    </p>
                </div>
                <div class="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
                    <span class="truncate max-w-[150px]"><i class="fa-solid fa-user-pen mr-1 text-[9px] text-slate-400"></i> ${safeAuthor}</span>
                    <span>${dateFormatted}</span>
                </div>
                ${adminButtons}
            </article>
        `;
    });
};

// FILTRO DE HORARIOS DE PARRILLA
window.filterScheduleDay = function(day) {
    document.querySelectorAll('.sched-day-btn').forEach(btn => {
        btn.className = "px-3 py-1.5 rounded-xl transition sched-day-btn text-slate-400 hover:text-white cursor-pointer";
    });
    const activeBtn = document.getElementById(`sched-day-${day}`);
    if (activeBtn) {
        activeBtn.className = "px-3 py-1.5 rounded-xl transition sched-day-btn bg-amber-500 text-slate-950 font-black cursor-pointer";
    }

    document.querySelectorAll('.sched-card').forEach(card => {
        if (day === 'all' || card.classList.contains(day)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
};

// ENVÍO DE PETICIÓN POR WHATSAPP
window.sendPrayerWhatsApp = function(e) {
    e.preventDefault();
    const name = document.getElementById('prayerName')?.value.trim();
    const city = document.getElementById('prayerCity')?.value.trim() || 'Venezuela';
    const msg = document.getElementById('prayerMessage')?.value.trim();

    const text = `🙏 *PETICIÓN DE ORACIÓN / SALUDO A CABINA*\n\n*Nombre:* ${name}\n*Lugar:* ${city}\n*Mensaje:* ${msg}\n\n_Enviado desde la página web oficial de Radio TV Manantial 90.7 FM_`;
    
    const phone = "584226690007";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    window.showToast("Abriendo WhatsApp para enviar tu petición...", "success");
};

// ==============================================================================
// PANEL ADMINISTRATIVO / DIRECTOR
// ==============================================================================
window.openAdminModal = function() {
    const modal = document.getElementById('adminModal');
    if (!modal) return;
    modal.classList.remove('hidden');

    const cloudBadge = document.getElementById('cloudStatusBadge');
    if (cloudBadge) {
        if (supabase) {
            cloudBadge.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-400"></span> Nube Supabase Activa (Esquema 3FN)`;
            cloudBadge.className = "text-[10px] font-bold text-emerald-400 flex items-center gap-1.5";
        } else {
            cloudBadge.innerHTML = `<span class="w-2 h-2 rounded-full bg-amber-400"></span> Modo Local (Sin credenciales en nube)`;
            cloudBadge.className = "text-[10px] font-bold text-amber-300 flex items-center gap-1.5";
        }
    }

    if (window.AppRadioState.isAdmin) {
        document.getElementById('adminLoginForm')?.classList.add('hidden');
        document.getElementById('adminControlArea')?.classList.remove('hidden');
        const marqueeInput = document.getElementById('adminMarqueeInput');
        if (marqueeInput) marqueeInput.value = window.AppRadioState.marqueeText;
    } else {
        document.getElementById('adminLoginForm')?.classList.remove('hidden');
        document.getElementById('adminControlArea')?.classList.add('hidden');
    }
};

window.closeAdminModal = function() {
    const modal = document.getElementById('adminModal');
    if (modal) modal.classList.add('hidden');
};

window.authenticateAdmin = async function() {
    const email = document.getElementById('adminEmailInput')?.value.trim();
    const pass = document.getElementById('adminPassInput')?.value.trim();

    if (supabase && email) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password: pass
            });

            if (error) throw error;
            window.AppRadioState.isAdmin = true;
            window.AppRadioState.adminUser = data.user;
            window.openAdminModal();
            window.renderPosts();
            window.showToast(`Bienvenido Director (${data.user.email})`, "success");
            return;
        } catch (err) {
            console.error("Supabase login error:", err);
            window.showToast(err.message || "Credenciales incorrectas en Supabase", "error");
            return;
        }
    }

    // Fallback de contingencia (clave master offline)
    if (pass === 'manantial907' || pass === '1234') {
        window.AppRadioState.isAdmin = true;
        window.openAdminModal();
        window.renderPosts();
        window.showToast("Acceso de Director concedido (Modo Local)", "success");
    } else {
        window.showToast("Contraseña o correo incorrectos.", "error");
    }
};

window.logoutAdmin = async function() {
    if (supabase) {
        await supabase.auth.signOut();
    }
    window.AppRadioState.isAdmin = false;
    window.AppRadioState.adminUser = null;
    window.closeAdminModal();
    window.renderPosts();
    window.showToast("Sesión de Director cerrada", "info");
};

window.saveNewPost = async function() {
    const title = document.getElementById('newPostTitle')?.value.trim();
    const categoryId = parseInt(document.getElementById('newPostCategory')?.value || '1', 10);
    const verse = document.getElementById('newPostVerse')?.value.trim();
    const content = document.getElementById('newPostContent')?.value.trim();

    if (!title || !content) {
        window.showToast("Por favor completa el título y la reflexión.", "warning");
        return;
    }

    if (supabase) {
        try {
            const postPayload = {
                title,
                category_id: categoryId,
                verse: verse || null,
                content,
                author_id: window.AppRadioState.adminUser?.id || null
            };

            const { data, error } = await supabase
                .from('posts')
                .insert([postPayload])
                .select();

            if (error) throw error;
            window.showToast("¡Mensaje guardado en la base de datos (3FN) con éxito!", "success");
            loadPostsFromSource();
        } catch (err) {
            console.error("Error guardando post en Supabase:", err);
            window.showToast("Error en la nube. Guardando copia local...", "error");
            savePostLocally(title, categoryId, verse, content);
        }
    } else {
        savePostLocally(title, categoryId, verse, content);
    }

    // Resetear formulario
    if (document.getElementById('newPostTitle')) document.getElementById('newPostTitle').value = '';
    if (document.getElementById('newPostVerse')) document.getElementById('newPostVerse').value = '';
    if (document.getElementById('newPostContent')) document.getElementById('newPostContent').value = '';
};

function savePostLocally(title, categoryId, verse, content) {
    const catInfo = CATEGORY_MAP[categoryId] || { name: 'Devocional', color: 'amber' };
    const newPost = {
        id: Date.now(),
        title,
        category: catInfo.name,
        badge_color: catInfo.color,
        author_name: 'Dirección Manantial',
        verse: verse || null,
        content,
        created_at: new Date().toISOString()
    };
    window.AppRadioState.posts.unshift(newPost);
    window.saveToLocalStorage();
    window.renderPosts();
    window.showToast("¡Mensaje publicado con éxito en modo local!", "success");
}

window.deletePost = async function(id) {
    if (!confirm("¿Seguro que deseas eliminar esta publicación de la emisora?")) return;

    if (supabase) {
        try {
            const { error } = await supabase
                .from('posts')
                .delete()
                .eq('id', id);

            if (error) throw error;
            window.showToast("Publicación eliminada de la nube", "info");
            loadPostsFromSource();
            return;
        } catch (err) {
            console.error("Error eliminando post de Supabase:", err);
        }
    }

    // Fallback local
    window.AppRadioState.posts = window.AppRadioState.posts.filter(p => p.id != id);
    window.saveToLocalStorage();
    window.renderPosts();
    window.showToast("Publicación eliminada", "info");
};

window.saveMarqueeText = async function() {
    const text = document.getElementById('adminMarqueeInput')?.value.trim();
    if (!text) return;

    if (supabase) {
        try {
            const { error } = await supabase
                .from('site_settings')
                .upsert({ key: 'marquee_text', value: text, updated_at: new Date().toISOString() });

            if (error) throw error;
            window.AppRadioState.marqueeText = text;
            const headerMarquee = document.getElementById('headerMarqueeText');
            if (headerMarquee) headerMarquee.textContent = text;
            window.showToast("Aviso actualizado en toda la red de oyentes", "success");
            return;
        } catch (err) {
            console.error("Error actualizando aviso en Supabase:", err);
        }
    }

    // Fallback local
    window.AppRadioState.marqueeText = text;
    const headerMarquee = document.getElementById('headerMarqueeText');
    if (headerMarquee) headerMarquee.textContent = text;
    window.saveToLocalStorage();
    window.showToast("Aviso superior actualizado", "success");
};

window.exportRadioData = function() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(window.AppRadioState, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute("href", dataStr);
    dl.setAttribute("download", `respaldo_manantial907_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(dl);
    dl.click();
    dl.remove();
    window.showToast("Copia de seguridad descargada", "success");
};

window.saveToLocalStorage = function() {
    try {
        localStorage.setItem('manantial_state_v1', JSON.stringify({
            posts: window.AppRadioState.posts,
            marqueeText: window.AppRadioState.marqueeText
        }));
    } catch (e) {
        console.warn("Storage full or unavailable");
    }
};

window.loadFromLocalStorage = function() {
    try {
        const saved = localStorage.getItem('manantial_state_v1');
        if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed.posts) && parsed.posts.length > 0) {
                window.AppRadioState.posts = parsed.posts;
            }
            if (parsed.marqueeText) {
                window.AppRadioState.marqueeText = parsed.marqueeText;
                const headerMarquee = document.getElementById('headerMarqueeText');
                if (headerMarquee) headerMarquee.textContent = parsed.marqueeText;
            }
        }
    } catch (e) {
        console.warn("No local state to load");
    }
};

// ==============================================================================
// INICIALIZACIÓN
// ==============================================================================
window.addEventListener('DOMContentLoaded', async () => {
    if (supabase) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            window.AppRadioState.isAdmin = true;
            window.AppRadioState.adminUser = session.user;
        }
    }

    await loadPostsFromSource();
    await loadMarqueeFromSource();
    setupRealtimeListeners();
    window.changeVolume(0.9);
});
