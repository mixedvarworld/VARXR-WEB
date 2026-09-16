import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api";
import type { Project, Property } from "../types";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";
import { formatArea, formatPrice } from "../utils";

export default function ProjectPage() {
  const { projectId } = useParams();
  const id = Number(projectId);
  const [project, setProject] = useState<Project>();
  const [properties, setProperties] = useState<Property[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!Number.isFinite(id)) return;
    Promise.all([api.getProject(id), api.getProjectProperties(id)])
      .then(([p, props]) => {
        setProject(p);
        setProperties(props);
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Unable to load project."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading label="Loading project…" />;
  if (error) return <ErrorState message={error} />;
  if (!project) return <ErrorState message="Project not found." />;

  return (
    <section className="section narrow">
      <Link to="/" className="back-link">← All projects</Link>
      <div className="project-hero">
        <div>
          <div className="eyebrow">{project.projectCode}</div>
          <h1>{project.projectName}</h1>
          <p className="lead">{project.location}</p>
          <p>{project.description}</p>
        </div>
        <div className="project-stat">
          <span>{properties.length}</span>
          <small>Property{properties.length === 1 ? "" : "ies"}</small>
        </div>
      </div>

      <div className="section-heading compact">
        <div>
          <div className="eyebrow">AVAILABLE</div>
          <h2>Properties</h2>
        </div>
      </div>

      {properties.length === 0 ? (
        <div className="state-card"><p>No properties are currently available.</p></div>
      ) : (
        <div className="property-grid">
          {properties.map((property) => (
            <Link
              key={property.propertyId}
              className="property-card"
              to={`/project/${id}/property/${property.propertyId}`}
            >
              <div className="property-card-image">
                {property.images?.[0]?.imageURL ? (
                  <img src={property.images[0].imageURL} alt={property.propertyType || "Property"} />
                ) : (
                  <span>3D PROPERTY</span>
                )}
              </div>
              <div className="property-card-body">
                <div className="eyebrow">{property.propertyStatus || "AVAILABLE"}</div>
                <h3>{property.bhk || property.propertyType || "Property"}</h3>
                <p>{property.propertyType || "Residential property"}</p>
                <div className="property-meta">
                  <span>{formatArea(property.areaSqFt)}</span>
                  <strong>{formatPrice(property.price)}</strong>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}