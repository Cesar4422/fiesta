import React, { useState, useRef } from 'react';
import { 
  CalendarDays, 
  MapPin, 
  Briefcase, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Navigation, 
  CheckCircle, 
  Music, 
  Volume2, 
  VolumeX 
} from 'lucide-react';
import ParticleBackground from './components/ParticleBackground';

// --- NUEVO: Importa tu póster de cumpleaños ---
// Reemplaza 'mi_foto_celebracion.jpeg' con el nombre exacto de tu archivo de imagen
// que guardaste en la carpeta 'src/assets/'
import posterCumple from './assets/mi_foto_celebracion.jpeg';

function App() {
  // Manejador de pantallas: 'home', 'details', 'rsvp', 'success'
  const [currentScreen, setCurrentScreen] = useState('home');
  
  // Estado para el formulario de confirmación
  const [formData, setFormData] = useState({ name: '', guests: '1', notes: '' });
  
  // Estados y Referencias para el Audio
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Función para procesar el envío del RSVP
  const handleRSVPSubmit = (e) => {
    e.preventDefault();
    setCurrentScreen('success');
  };

  // Iniciar la experiencia: cambia de pantalla y activa el audio
  const startExperience = () => {
    setCurrentScreen('details');
    if (audioRef.current) {
      audioRef.current.play().catch(error => console.log("El navegador bloqueó el audio:", error));
      setIsPlaying(true);
    }
  };

  // Control manual del reproductor (Mute/Unmute)
  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen font-sans flex items-center justify-center p-4 sm:p-6 selection:bg-white selection:text-black relative overflow-hidden text-white">
      
      {/* Fondo de partículas y gradiente animado */}
      <ParticleBackground />

      {/* Etiqueta de audio (archivo en carpeta public) */}
      <audio ref={audioRef} src="/cancion.m4a" loop />

      {/* Botón flotante de control de música (se oculta en la pantalla de inicio) */}
      {currentScreen !== 'home' && (
        <button 
          onClick={toggleAudio}
          className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] group"
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
          ) : (
            <VolumeX className="w-5 h-5 text-white/50 group-hover:scale-110 transition-transform" />
          )}
        </button>
      )}

      {/* Contenedor Principal con animación de entrada (fade-in-up) */}
      <div className="animate-fade-in-up max-w-xl w-full bg-black/40 backdrop-blur-2xl border border-white/10 p-8 sm:p-12 md:p-14 text-center shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-3xl transition-all duration-700 relative z-10 overflow-hidden min-h-[400px] flex flex-col justify-center">
        
        {/* Línea decorativa superior */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

        {/* --- PANTALLA 1: INICIO --- */}
        {currentScreen === 'home' && (
          <div className="animate-content-show flex flex-col items-center">
            <Sparkles className="w-8 h-8 mb-6 text-white/70 animate-pulse" strokeWidth={1} />
            <h1 className="text-4xl md:text-5xl font-extralight mb-6 tracking-[0.2em] uppercase">
              Estás Invitado, CesarFest Vol.I
            </h1>
            <div className="w-12 h-px bg-white/30 mb-8"></div>
            <p className="mb-12 text-base md:text-lg font-light leading-relaxed text-neutral-300 max-w-sm">
              Acompáñame a celebrar un momento inolvidable. Una experiencia diseñada con total atención al detalle.
            </p>
            <button 
              onClick={startExperience}
              className="group flex items-center justify-center gap-3 bg-white text-black px-8 py-4 w-full sm:w-auto text-sm font-semibold uppercase tracking-widest rounded-full hover:bg-neutral-200 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
            >
              Abrir Invitación
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {/* --- PANTALLA 2: DETALLES --- */}
        {currentScreen === 'details' && (
          <div className="animate-content-show text-left flex flex-col items-center w-full">
            <h2 className="text-2xl sm:text-3xl font-light mb-8 tracking-[0.15em] uppercase text-center w-full border-b border-white/10 pb-6">
              Detalles del Evento
            </h2>
            
            <div className="space-y-4 mb-10 w-full">
              {/* Recuadro: Fecha */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors duration-300">
                <div className="p-3 rounded-full bg-white/10 text-white shrink-0"><CalendarDays className="w-6 h-6" strokeWidth={1.5} /></div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">Cuándo</p>
                  <p className="text-base sm:text-lg font-medium text-white">Sábado, 18 de Abril, 2026</p>
                  <p className="text-sm text-neutral-400">16:00 hrs, hora establecida para comer, se puede llegar después</p>
                </div>
              </div>

              {/* Recuadro: Ubicación */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors duration-300">
                <div className="p-3 rounded-full bg-white/10 text-white shrink-0"><MapPin className="w-6 h-6" strokeWidth={1.5} /></div>
                <div className="w-full">
                  <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">Dónde</p>
                  <p className="text-base sm:text-lg font-medium text-white">Las Huertas 3ra Sección</p>
                  <p className="text-sm text-neutral-400 mb-3">Estado de México</p>
                  <a 
                    href="https://maps.app.goo.gl/jv7g5eVYPisbEiug6?g_st=aw" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full transition-colors"
                  >
                    <Navigation className="w-3 h-3" /> Abrir en Maps
                  </a>
                </div>
              </div>

              {/* Recuadro: Vestimenta */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors duration-300">
                <div className="p-3 rounded-full bg-white/10 text-white shrink-0"><Briefcase className="w-6 h-6" strokeWidth={1.5} /></div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">Código de Vestimenta</p>
                  <p className="text-base sm:text-lg font-medium text-white">No estipulado</p>
                </div>
              </div>

              {/* Recuadro: La Celebración */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors duration-300">
                <div className="p-3 rounded-full bg-white/10 text-white shrink-0"><Music className="w-6 h-6" strokeWidth={1.5} /></div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-1">La Celebración</p>
                  <p className="text-sm sm:text-base font-light text-neutral-200 leading-relaxed">
                    Disfrutaremos de un día especial amenizado con música, comida y tomando los drinks que podamos. ¡Celebraremos juntos hasta que amanezca!
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-4">
              <button 
                onClick={() => setCurrentScreen('rsvp')}
                className="bg-white text-black px-8 py-4 w-full text-sm font-semibold uppercase tracking-widest rounded-full hover:bg-neutral-200 hover:scale-[1.02] transition-all duration-300 shadow-lg"
              >
                Confirmar Asistencia
              </button>
              <button 
                onClick={() => {
                  setCurrentScreen('home');
                  if (audioRef.current) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                    setIsPlaying(false);
                  }
                }}
                className="group flex items-center justify-center gap-3 text-neutral-400 px-6 py-3 text-sm font-semibold uppercase tracking-widest hover:text-white transition-colors duration-300"
              >
                <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Volver al inicio
              </button>
            </div>
          </div>
        )}

        {/* --- PANTALLA 3: FORMULARIO RSVP --- */}
        {currentScreen === 'rsvp' && (
          <div className="animate-content-show text-left flex flex-col w-full">
            <h2 className="text-2xl sm:text-3xl font-light mb-2 tracking-[0.15em] uppercase text-center w-full">
              Asistencia
            </h2>
            <p className="text-center text-neutral-400 text-sm mb-8 border-b border-white/10 pb-6">
              Por favor, confirma.
            </p>

            <form onSubmit={handleRSVPSubmit} className="space-y-5 mb-8">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Nombre Completo *</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/50 transition-colors"
                  placeholder="Ej. Carlos Martínez"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Número de Acompañantes</label>
                <select 
                  value={formData.guests}
                  onChange={(e) => setFormData({...formData, guests: e.target.value})}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/50 transition-colors appearance-none cursor-pointer"
                >
                  <option value="1">Solo yo</option>
                  <option value="2">2 Personas (Total)</option>
                  <option value="3">3 Personas (Total)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2">Restricciones Alimenticias (Opcional)</label>
                <textarea 
                  rows="2"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/50 transition-colors resize-none"
                  placeholder="Alergias, menú vegetariano, etc."
                ></textarea>
              </div>

              <button 
                type="submit"
                className="bg-white text-black px-8 py-4 w-full text-sm font-semibold uppercase tracking-widest rounded-full hover:bg-neutral-200 hover:scale-[1.02] transition-all duration-300 mt-4 shadow-lg"
              >
                Enviar Confirmación
              </button>
            </form>

            <button 
              onClick={() => setCurrentScreen('details')}
              className="group flex items-center justify-center gap-3 text-neutral-400 px-6 py-2 text-sm font-semibold uppercase tracking-widest hover:text-white transition-colors duration-300 mx-auto"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Cancelar
            </button>
          </div>
        )}

        {/* --- PANTALLA 4: ÉXITO (Rediseñada para póster retrato) --- */}
        {currentScreen === 'success' && (
          <div className="animate-content-show flex flex-col items-center justify-center text-center">
            <CheckCircle className="w-16 h-16 text-white mb-6 animate-pulse" strokeWidth={1} />
            <h2 className="text-3xl font-light mb-4 tracking-[0.1em] uppercase">
              ¡Gracias, {formData.name.split(' ')[0]}!
            </h2>
            <p className="mb-8 text-neutral-300 font-light">
              Hemos registrado tu asistencia. Te esperamos para compartir este momento especial.
            </p>
            
            {/* --- CAMBIO: Contenedor rediseñado para formato Retrato --- */}
            <div className="flex justify-center w-full mb-8">
              <div className="w-auto h-[32rem] max-w-[20rem] rounded-2xl overflow-hidden border border-white/10 relative shadow-2xl shadow-black/30">
                <div className="absolute inset-0 bg-black/20 z-10"></div>
                {/* --- CAMBIO: Usa tu póster importado y object-contain --- */}
                <img 
                  src={posterCumple} 
                  alt="Póster de cumpleaños de César" 
                  className="w-full h-full object-contain grayscale opacity-80"
                />
              </div>
            </div>

            <button 
              onClick={() => {
                setFormData({ name: '', guests: '1', notes: '' });
                setCurrentScreen('home');
                if (audioRef.current) {
                  audioRef.current.pause();
                  audioRef.current.currentTime = 0;
                  setIsPlaying(false);
                }
              }}
              className="text-neutral-400 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors border-b border-transparent hover:border-white pb-1"
            >
              Finalizar
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;