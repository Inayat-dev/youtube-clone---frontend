import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home, ThumbsUp, History, Video, Folder,
  UserCheck, HelpCircle, Settings, Menu, X,
} from "lucide-react";
import "../assets/css/Sidebar.css";

const mainLinks = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/liked", label: "Liked Videos", icon: ThumbsUp },
  { to: "/history", label: "History", icon: History },
  { to: "/my-content", label: "My Content", icon: Video },
  { to: "/collections", label: "Collections", icon: Folder },
  { to: "/subscribers", label: "Subscribers", icon: UserCheck },
];

const bottomLinks = [
  { to: "/support", label: "Support", icon: HelpCircle },
  { to: "/settings", label: "Settings", icon: Settings },
];

function NavSection({ items, onNavigate }) {
  return (
    <>
      {items.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onNavigate}
          className={({ isActive }) =>
            `sidebar__item${isActive ? " sidebar__item--active" : ""}`
          }
        >
          <Icon size={18} strokeWidth={1.8} className="sidebar__icon" />
          <span className="sidebar__label">{label}</span>
        </NavLink>
      ))}
    </>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="sidebar__toggle" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open && <div className="sidebar__backdrop" onClick={() => setOpen(false)} />}

      <aside className={`sidebar${open ? " sidebar--open" : ""}`}>
        <nav className="sidebar__section">
          <NavSection items={mainLinks} onNavigate={() => setOpen(false)} />
        </nav>
        <nav className="sidebar__section sidebar__section--bottom">
          <NavSection items={bottomLinks} onNavigate={() => setOpen(false)} />
        </nav>
      </aside>
    </>
  );
}