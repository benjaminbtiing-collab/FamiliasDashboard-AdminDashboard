import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home, BookOpen, CheckSquare, Clock, Calendar,
  MessageSquare, User, LogOut, GraduationCap, ChevronDown,
  MapPin, AlertCircle, Clock3
} from "lucide-react";
import "./FamiliaDashboard.css";

// ── Datos de ejemplo ───────────────────────────────────────────────────────
const ESTUDIANTES = [
  { id: 1, nombre: "Valentín López", curso: "3º Año A · Grupo A" },
  { id: 2, nombre: "Sofía López",    curso: "1º Año B · Grupo C" },
];

const CLASES_HOY = [
  { id: 1, inicio: "07.30", fin: "08:50", materia: "Historia",  profesor: "Prof. Martínez",  aula: "Aula 8",      color: "#ff1900" },
  { id: 2, inicio: "09.00", fin: "10:20", materia: "Inglés",    profesor: "Prof. Williams",  aula: "Aula 5",      color: "#ff6600" },
  { id: 3, inicio: "10.30", fin: "11:50", materia: "Física",    profesor: "Prof. Sánchez",   aula: "Lab. Física", color: "#0080ff" },
  { id: 4, inicio: "13.00", fin: "14:20", materia: "Biología",  profesor: "Prof. Fernández", aula: "Lab. Bio",    color: "#00f064"},
];

const EVENTOS = [
  { id: 1, fecha: "30/04/2026", hora: "09:00", nombre: "Acto 1º de Mayo",              lugar: "Aula Magna", tipo: "acto"    },
  { id: 2, fecha: "02/05/2026", hora: null,    nombre: "Jornada docente — sin clases",  lugar: null,         tipo: "jornada" },
  { id: 3, fecha: "06/05/2026", hora: "08:00", nombre: "Entrega de TPs — Matemática",   lugar: "Aula 12",    tipo: "entrega" },
];

const MOVIMIENTOS = [
  { id: 1, tipo: "tarde",   materia: "Matemática", detalle: "Llegó 10 min tarde",             fecha: "Lunes 21/04"  },
  { id: 2, tipo: "ausente", materia: "Biología",   detalle: "",                                fecha: "Martes 22/04" },
  { id: 3, tipo: "tarde",   materia: "Historia",   detalle: "Ingresó 8 min tarde por tráfico", fecha: "Jueves 24/04" },
];

const ASISTENCIA = { porcentaje: 82, inasistencias: 8, permitidas: 15 };

const COMUNICADOS = [
  { id: 1, titulo: "Ausencia del Prof. García",  cuerpo: "Informamos que mañana el Prof. García (Matemática) no asistirá. La hora será libre.", fecha: "27 abr" },
  { id: 2, titulo: "Cambio de horario",           cuerpo: "El jueves la clase de Física se traslada al laboratorio 2 por mantenimiento.",          fecha: "25 abr" },
  { id: 3, titulo: "Entrega de boletines",        cuerpo: "La entrega de boletines del 1er cuatrimestre será el martes 29 de abril a las 18:00 hs.", fecha: "23 abr" },
];

const NAV_ITEMS = [
  { id: "inicio",      label: "Inicio",      Icon: Home          },
  { id: "notas",       label: "Notas",       Icon: BookOpen      },
  { id: "asistencia",  label: "Asistencia",  Icon: CheckSquare   },
  { id: "horario",     label: "Horario",     Icon: Clock         },
  { id: "eventos",     label: "Eventos",     Icon: Calendar      },
  { id: "comunicados", label: "Comunicados", Icon: MessageSquare },
  { id: "perfil",      label: "Perfil",      Icon: User          },
];

// ── Círculo de asistencia ──────────────────────────────────────────────────
function CirculoAsistencia({ porcentaje }) {
  const r = 34;
  const circunferencia = 2 * Math.PI * r;
  const offset = circunferencia - (porcentaje / 100) * circunferencia;
  return (
    <svg width="90" height="90" viewBox="0 0 80 80" className="fd-circulo-svg">
      <circle cx="40" cy="40" r={r} className="fd-circulo-bg" />
      <circle
        cx="40" cy="40" r={r}
        className="fd-circulo-fill"
        strokeDasharray={circunferencia}
        strokeDashoffset={offset}
        style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
      />
      <text x="40" y="45" textAnchor="middle" className="fd-circulo-texto">
        {porcentaje}%
      </text>
    </svg>
  );
}

// ── Componente principal ───────────────────────────────────────────────────
export default function FamiliaDashboard() {
  const navigate = useNavigate();
  const [navActiva, setNavActiva]             = useState("inicio");
  const [estudianteIdx, setEstudianteIdx]     = useState(0);
  const [selectorAbierto, setSelectorAbierto] = useState(false);
  const [horaActual, setHoraActual]           = useState("");

  const estudiante = ESTUDIANTES[estudianteIdx];

  useEffect(() => {
    const tick = () => {
      setHoraActual(
        new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    };
    tick();
    const intervalo = setInterval(tick, 1000);
    return () => clearInterval(intervalo);
  }, []);

  const fechaHoy = new Date().toLocaleDateString("es-AR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="fd-layout">

      {/* ── SIDEBAR ──────────────────────────────────────────────────── */}
      <aside className="fd-sidebar">
        <div className="fd-school-info">
          <div className="fd-school-icon">
            <img
              src="/img/LOGO%202.png"
              alt="Logo E.E.S.T. Nº1"
              className="fd-school-logo"
            />
          </div>
          <div className="fd-school-texts">
            <p className="fd-school-name">E.E.S.T. Nº1</p>
            <p className="fd-school-sub">Manuel Belgrano · Tres de Febrero</p>
          </div>
        </div>

        <nav className="fd-nav">
          {NAV_ITEMS.map(({ id, label, Icon }) => (
            <button
              key={id}
              className={`fd-nav-item ${navActiva === id ? "fd-nav-item--active" : ""}`}
              onClick={() => setNavActiva(id)}
            >
              <Icon size={16} className="fd-nav-icon" />
              {label}
            </button>
          ))}
        </nav>

        <div className="fd-user-section">
          <div className="fd-user-info">
            <div className="fd-avatar">MG</div>
            <div>
              <p className="fd-user-name">María González</p>
              <p className="fd-user-role">Tutor / Familia</p>
            </div>
          </div>
          <button className="fd-logout" onClick={handleLogout}>
            <LogOut size={13} /> Cerrar sesión
          </button>
        </div>
      </aside>

      {/* ── CONTENIDO PRINCIPAL ──────────────────────────────────────── */}
      <main className="fd-main">

        {/* Grid */}
        <div className="fd-content">

          {/* Hero — Estudiante a cargo */}
          <div className="fd-hero">
            <p className="fd-hero-fecha">
              <Calendar size={14} style={{marginRight: 6, verticalAlign: "middle"}} />
              {new Date().toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).replace(/^\w/, c => c.toUpperCase())}
            </p>
            <p className="fd-topbar-label">ESTUDIANTE A CARGO</p>
            <div className="fd-selector-wrapper">
              <button
                className="fd-selector-btn"
                onClick={() => setSelectorAbierto(!selectorAbierto)}
              >
                <GraduationCap size={16} className="fd-selector-icon" />
                <div className="fd-selector-info">
                  <span className="fd-selector-nombre">{estudiante.nombre}</span>
                  <span className="fd-selector-curso">{estudiante.curso}</span>
                </div>
                <ChevronDown
                  size={14}
                  style={{ transform: selectorAbierto ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", marginLeft: "auto" }}
                />
              </button>
              {selectorAbierto && (
                <div className="fd-selector-dropdown">
                  {ESTUDIANTES.map((e, i) => (
                    <button
                      key={e.id}
                      className={`fd-selector-option ${i === estudianteIdx ? "fd-selector-option--active" : ""}`}
                      onClick={() => { setEstudianteIdx(i); setSelectorAbierto(false); }}
                    >
                      <strong>{e.nombre}</strong>
                      <span>{e.curso}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Comunicados */}
          <div className="fd-card fd-card--full">
            <h3 className="fd-card-title fd-card-title--comunicados">
              <span className="fd-card-icon">
                <MessageSquare size={15} />
              </span>
              Comunicados del Preceptor
            </h3>
            <div className="fd-comunicados-lista">
              {COMUNICADOS.map((c) => (
                <div key={c.id} className="fd-comunicado-item">
                  <div className="fd-comunicado-header">
                    <span className="fd-comunicado-badge">PRECEPTOR</span>
                    <span className="fd-comunicado-fecha">{c.fecha}</span>
                  </div>
                  <p className="fd-comunicado-titulo">{c.titulo}</p>
                  <p className="fd-comunicado-cuerpo">{c.cuerpo}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Clases de hoy */}
          <div className="fd-card">
            <h3 className="fd-card-title">Clases de hoy</h3>
            <div className="fd-clases-lista">
              {CLASES_HOY.map((clase) => (
                <div key={clase.id} className="fd-clase-item">
                  <div className="fd-clase-tiempo">
                    <span className="fd-clase-inicio">{clase.inicio}</span>
                    <span className="fd-clase-fin">{clase.fin}</span>
                  </div>
                  <span className="fd-clase-dot" style={{ background: clase.color }} />
                  <div className="fd-clase-info">
                    <p className="fd-clase-nombre">{clase.materia}</p>
                    <p className="fd-clase-meta">{clase.profesor} · <MapPin size={11} style={{marginRight:2, verticalAlign:"middle"}} />{clase.aula}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Eventos próximos */}
          <div className="fd-card">
            <h3 className="fd-card-title">
              <Calendar size={15} style={{marginRight:6, verticalAlign:"middle"}} />
              Eventos próximos
            </h3>
            <div className="fd-eventos-lista">
              {EVENTOS.map((evento) => (
                <div key={evento.id} className={`fd-evento-item fd-evento--${evento.tipo}`}>
                  <p className="fd-evento-fecha">
                    {evento.fecha}{evento.hora ? ` · ${evento.hora}` : ""}
                  </p>
                  <p className="fd-evento-nombre">{evento.nombre}</p>
                  {evento.lugar && (
                    <p className="fd-evento-lugar">
                      <MapPin size={11} style={{marginRight:3, verticalAlign:"middle"}} />
                      {evento.lugar}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <p className="fd-ver-mas">Ver calendario completo →</p>
          </div>

          {/* Movimientos de la semana */}
          <div className="fd-card">
            <h3 className="fd-card-title">Movimientos de la semana</h3>
            <p className="fd-card-subtitulo">Inasistencias y tardanzas registradas esta semana</p>
            <div className="fd-mov-lista">
              {MOVIMIENTOS.map((mov) => (
                <div key={mov.id} className="fd-mov-item">
                  <div className={`fd-mov-icon fd-mov-icon--${mov.tipo}`}>
                    {mov.tipo === "tarde" ? <Clock3 size={14} /> : <AlertCircle size={14} />}
                  </div>
                  <div className="fd-mov-info">
                    <p className="fd-mov-materia">{mov.materia} — {mov.tipo === "tarde" ? "Tarde" : "Ausente"}</p>
                    {mov.detalle && <p className="fd-mov-detalle">{mov.detalle}</p>}
                  </div>
                  <span className="fd-mov-fecha">{mov.fecha}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Estado de asistencia */}
          <div className="fd-card">
            <h3 className="fd-card-title">Estado de asistencia</h3>
            <div className="fd-asistencia-wrap">
              <CirculoAsistencia porcentaje={ASISTENCIA.porcentaje} />
              <div className="fd-asistencia-stats">
                <p className="fd-asistencia-stat">
                  Inasistencias: {ASISTENCIA.inasistencias} de {ASISTENCIA.permitidas} permitidas
                </p>
                <p className="fd-asistencia-stat">
                  Quedan {ASISTENCIA.permitidas - ASISTENCIA.inasistencias} antes del límite
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}