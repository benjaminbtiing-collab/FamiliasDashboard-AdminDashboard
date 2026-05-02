import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, GraduationCap, UserCheck, UserCog,
  BookOpen, CalendarDays, Clock, LogOut, Bell,
  UserPlus, FolderPlus, CalendarClock, Send, BarChart2, Settings,
  CheckCircle2, Info, MessageSquare, AlertCircle
} from "lucide-react";
import "./AdminDashboard.css";

// ── Datos de ejemplo ───────────────────────────────────────────────────────
const STATS = [
  { id: 1, valor: 342, label: "Estudiantes",        Icon: GraduationCap, color: "blue"   },
  { id: 2, valor: 28,  label: "Docentes activos",   Icon: Users,         color: "green"  },
  { id: 3, valor: 18,  label: "Cursos activos",     Icon: FolderPlus,    color: "purple" },
  { id: 4, valor: 12,  label: "Comunicados este mes", Icon: MessageSquare, color: "pink" },
];

const ACCESO_RAPIDO = [
  { id: 1, label: "Agregar usuario",    Icon: UserPlus,      color: "gray"   },
  { id: 2, label: "Crear curso",        Icon: FolderPlus,    color: "green"  },
  { id: 3, label: "Gestionar horarios", Icon: CalendarClock, color: "blue"   },
  { id: 4, label: "Enviar comunicado",  Icon: Send,          color: "purple" },
  { id: 5, label: "Ver reportes",       Icon: BarChart2,     color: "yellow" },
  { id: 6, label: "Configuración",      Icon: Settings,      color: "gray2"  },
];

const ACTIVIDAD = [
  { id: 1, tipo: "check",   texto: "Curso 3°B creado",                          tiempo: "Hace 10 min"  },
  { id: 2, tipo: "info",    texto: "Docente García agregado al sistema",         tiempo: "Hace 25 min"  },
  { id: 3, tipo: "message", texto: "Comunicado enviado a todos los preceptores", tiempo: "Hace 1 hora"  },
  { id: 4, tipo: "alert",   texto: "Horario de 2°A modificado",                 tiempo: "Hace 2 horas" },
  { id: 5, tipo: "check",   texto: "Boletines del 1° cuatrimestre exportados",  tiempo: "Hace 3 horas" },
  { id: 6, tipo: "info",    texto: "Tutora López vinculada a Valentín López",   tiempo: "Ayer 16:30"   },
  { id: 7, tipo: "check",   texto: 'Materia "Tecnología" agregada al plan de 2°A', tiempo: "Ayer 11:00" },
];

const NAV_SECTIONS = [
  {
    titulo: "INICIO",
    items: [
      { id: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
    ],
  },
  {
    titulo: "USUARIOS",
    items: [
      { id: "estudiantes",      label: "Estudiantes",      Icon: GraduationCap },
      { id: "docentes",         label: "Docentes",         Icon: UserCheck     },
      { id: "preceptores",      label: "Preceptores",      Icon: UserCog       },
      { id: "tutores-familias", label: "Tutores / Familias", Icon: Users       },
    ],
  },
  {
    titulo: "ACADÉMICO",
    items: [
      { id: "cursos",   label: "Cursos",   Icon: FolderPlus },
      { id: "materias", label: "Materias", Icon: BookOpen   },
      { id: "horarios", label: "Horarios", Icon: Clock      },
    ],
  },
  {
    titulo: "CALENDARIO",
    items: [
      { id: "eventos", label: "Eventos / Calendario", Icon: CalendarDays },
    ],
  },
];

function ActividadIcono({ tipo }) {
  if (tipo === "check")   return <CheckCircle2 size={16} className="ad-act-icon ad-act-icon--check" />;
  if (tipo === "info")    return <Info         size={16} className="ad-act-icon ad-act-icon--info"  />;
  if (tipo === "message") return <MessageSquare size={16} className="ad-act-icon ad-act-icon--message" />;
  if (tipo === "alert")   return <AlertCircle  size={16} className="ad-act-icon ad-act-icon--alert" />;
  return null;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [navActiva, setNavActiva] = useState("dashboard");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="ad-layout">

      {/* ── SIDEBAR ──────────────────────────────────────────────────── */}
      <aside className="ad-sidebar">
        <div className="ad-school-info">
          <div className="ad-school-icon">
            <img
              src="/img/LOGO%202.png"
              alt="Logo E.E.S.T. Nº1"
              className="ad-school-logo"
            />
          </div>
          <div className="ad-school-texts">
            <p className="ad-school-name">E.E.S.T. Nº1</p>
            <p className="ad-school-sub">Sistema de Gestión</p>
          </div>
        </div>

        <nav className="ad-nav">
          {NAV_SECTIONS.map((section) => (
            <div key={section.titulo} className="ad-nav-section">
              <p className="ad-nav-section-title">{section.titulo}</p>
              {section.items.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  className={`ad-nav-item ${navActiva === id ? "ad-nav-item--active" : ""}`}
                  onClick={() => setNavActiva(id)}
                >
                  <Icon size={16} className="ad-nav-icon" />
                  {label}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="ad-user-section">
          <div className="ad-user-info">
            <div className="ad-avatar">A</div>
            <div>
              <p className="ad-user-name">Administrador</p>
              <p className="ad-user-role">Administrador</p>
            </div>
          </div>
          <button className="ad-logout" onClick={handleLogout}>
            <LogOut size={13} /> Salir
          </button>
        </div>
      </aside>

      {/* ── MAIN ─────────────────────────────────────────────────────── */}
      <main className="ad-main">

        {/* Topbar */}
        <div className="ad-topbar">
          <span className="ad-topbar-title">Admin</span>
          <div className="ad-topbar-right">
            <button className="ad-bell"><Bell size={18} /></button>
            <div className="ad-topbar-user">
              <div className="ad-topbar-avatar">A</div>
              <span>Administrador</span>
            </div>
          </div>
        </div>

        {/* Contenido */}
        <div className="ad-content">

          {/* Título */}
          <div className="ad-header">
            <h1 className="ad-title">Dashboard</h1>
            <p className="ad-subtitle">Ciclo lectivo 2026 · Lunes a Viernes</p>
          </div>

          {/* Stats */}
          <div className="ad-stats-grid">
            {STATS.map(({ id, valor, label, Icon, color }) => (
              <div key={id} className={`ad-stat-card ad-stat-card--${color}`}>
                <div className={`ad-stat-icon-wrap ad-stat-icon-wrap--${color}`}>
                  <Icon size={22} />
                </div>
                <div className="ad-stat-info">
                  <p className="ad-stat-valor">{valor}</p>
                  <p className="ad-stat-label">{label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Acceso rápido */}
          <div className="ad-card">
            <p className="ad-section-label">ACCESO RÁPIDO</p>
            <div className="ad-acceso-grid">
              {ACCESO_RAPIDO.map(({ id, label, Icon, color }) => (
                <button key={id} className={`ad-acceso-btn ad-acceso-btn--${color}`}>
                  <Icon size={18} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Actividad reciente */}
          <div className="ad-card">
            <h3 className="ad-card-title">
              <Clock size={18} style={{ marginRight: 8, verticalAlign: "middle", color: "#4a63e0" }} />
              Actividad reciente
            </h3>
            <div className="ad-actividad-lista">
              {ACTIVIDAD.map((act) => (
                <div key={act.id} className="ad-actividad-item">
                  <ActividadIcono tipo={act.tipo} />
                  <span className="ad-actividad-texto">{act.texto}</span>
                  <span className="ad-actividad-tiempo">{act.tiempo}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}