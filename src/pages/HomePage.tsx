import { useEffect, useState } from "react";
import { api } from "../api";
import type { Project } from "../types";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";
import ProjectCard from "../components/ProjectCard";

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getProjects()
      .then(setProjects)
      .catch((e) => setError(e instanceof Error ? e.message : "Unable to load projects."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">IMMERSIVE REAL ESTATE</div>
          <h1>See the property before you visit.</h1>
          <p>
            Explore projects, inspect room information and experience your
            property model in interactive 3D.
          </p>
          <a href="#projects" className="primary-btn">Explore projects</a>
        </div>
        <div className="hero-orbit">
          <div className="orbit-ring ring-one" />
          <div className="orbit-ring ring-two" />
          <div className="orbit-core">XR</div>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="section-heading">
          <div>
            <div className="eyebrow">DISCOVER</div>
            <h2>Projects</h2>
          </div>
          <p>Choose a project to explore its available properties.</p>
        </div>

        {loading && <Loading label="Loading projects from VARXR API…" />}
        {error && <ErrorState message={error} />}
        {!loading && !error && projects.length === 0 && (
          <div className="state-card"><p>No projects available.</p></div>
        )}
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.projectId} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}