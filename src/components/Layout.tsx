import { Link } from "react-router-dom";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to="/" className="brand">
          <span className="brand-mark">V</span>
          <span>VAR<span>XR</span></span>
        </Link>
        <nav>
          <Link to="/">Projects</Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div>
          <strong>VARXR</strong>
          <p>Explore property in a more immersive way.</p>
        </div>
        <div className="footer-note">3D • AR • Real Estate</div>
      </footer>
    </div>
  );
}