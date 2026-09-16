import { Link } from "react-router-dom";
import type { Project } from "../types";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link className="project-card" to={`/project/${project.projectId}`}>
      {project.imageURL ? (
        <img src={project.imageURL} alt={project.projectName} />
      ) : (
        <div className="image-placeholder">
          <span>VARXR</span>
        </div>
      )}
      <div className="project-card-body">
        <div className="eyebrow">{project.projectCode}</div>
        <h3>{project.projectName}</h3>
        <p>{project.location || "Location available in project details"}</p>
        <span className="text-link">Explore project →</span>
      </div>
    </Link>
  );
}