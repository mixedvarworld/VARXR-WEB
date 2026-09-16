import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="section narrow">
      <div className="state-card">
        <div className="eyebrow">404</div>
        <h1>Page not found</h1>
        <p>The VARXR page you requested does not exist.</p>
        <Link className="primary-btn" to="/">Back to projects</Link>
      </div>
    </section>
  );
}