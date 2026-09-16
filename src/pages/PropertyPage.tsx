import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api";
import type { Project, Property, Room, XRModel } from "../types";
import Loading from "../components/Loading";
import ErrorState from "../components/ErrorState";
import RoomList from "../components/RoomList";
import RoomDetails from "../components/RoomDetails";
import InquiryForm from "../components/InquiryForm";
import ModelViewer from "../components/ModelViewer";
import { formatArea, formatPrice } from "../utils";

export default function PropertyPage() {
  const { projectId, propertyId } = useParams();
  const pid = Number(projectId);
  const id = Number(propertyId);

  const [project, setProject] = useState<Project>();
  const [property, setProperty] = useState<Property>();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [xrModels, setXrModels] = useState<XRModel[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!Number.isFinite(pid) || !Number.isFinite(id)) return;

    Promise.all([
      api.getProject(pid),
      api.getProjectProperties(pid),
      api.getRooms(id),
      api.getXRModels(id),
    ])
      .then(([p, properties, roomData, models]) => {
        setProject(p);
        const selected = properties.find((x) => x.propertyId === id);
        if (!selected) throw new Error(`Property ${id} was not found in project ${pid}.`);
        setProperty(selected);
        setRooms(roomData.filter((x) => x.isActive));
        setSelectedRoom(roomData.find((x) => x.isActive));
        setXrModels(models.filter((x) => x.isActive !== false));
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Unable to load property."))
      .finally(() => setLoading(false));
  }, [pid, id]);

  const modelUrl = useMemo(() => {
    const active = xrModels.find((m) => m.arSupported && m.modelURL) ||
      xrModels.find((m) => m.modelURL);
    return active?.modelURL || property?.xr?.modelURL || "";
  }, [xrModels, property]);

  if (loading) return <Loading label="Loading property, rooms and 3D model…" />;
  if (error) return <ErrorState message={error} />;
  if (!property || !project) return <ErrorState message="Property not found." />;

  return (
    <section className="section narrow">
      <Link to={`/project/${pid}`} className="back-link">← {project.projectName}</Link>

      <div className="property-heading">
        <div>
          <div className="eyebrow">{property.propertyStatus || "PROPERTY"}</div>
          <h1>{property.bhk || property.propertyType || "Property"}</h1>
          <p className="lead">{property.builderName || project.projectName}</p>
        </div>
        <div className="price-block">
          <strong>{formatPrice(property.price)}</strong>
          <span>{formatArea(property.areaSqFt)}</span>
        </div>
      </div>

      <div className="facts">
        <div><span>Type</span><strong>{property.propertyType || "—"}</strong></div>
        <div><span>Bedrooms</span><strong>{property.bedrooms ?? "—"}</strong></div>
        <div><span>Bathrooms</span><strong>{property.bathrooms ?? "—"}</strong></div>
        <div><span>Facing</span><strong>{property.facing || "—"}</strong></div>
        <div><span>Floor</span><strong>{property.floorNo ?? "—"} / {property.totalFloors ?? "—"}</strong></div>
      </div>

      <div className="description-card">
        <div className="eyebrow">ABOUT THE PROPERTY</div>
        <p>{property.description || "Property description will appear here."}</p>
      </div>

      <section className="immersive-section">
        <div className="section-heading compact">
          <div>
            <div className="eyebrow">INTERACTIVE 3D</div>
            <h2>Explore the property</h2>
          </div>
          {modelUrl && <span className="model-badge">GLB MODEL</span>}
        </div>

        {modelUrl ? (
          <ModelViewer url={modelUrl} />
        ) : (
          <div className="viewer-unavailable">
            <h3>3D model not available</h3>
            <p>The property information and rooms are still available below.</p>
          </div>
        )}
      </section>

      <section className="rooms-section">
        <div className="section-heading compact">
          <div>
            <div className="eyebrow">ROOM INFO</div>
            <h2>Rooms</h2>
          </div>
          <span className="count-pill">{rooms.length}</span>
        </div>

        {rooms.length === 0 ? (
          <div className="state-card"><p>No room information available.</p></div>
        ) : (
          <div className="rooms-layout">
            <RoomList rooms={rooms} selected={selectedRoom} onSelect={setSelectedRoom} />
            <RoomDetails room={selectedRoom} />
          </div>
        )}
      </section>

      <div className="bottom-grid">
        <InquiryForm propertyId={id} />
        {property.floorPlan?.floorPlanURL && (
          <div className="floorplan-card">
            <div className="eyebrow">FLOOR PLAN</div>
            <h3>View floor plan</h3>
            <p>{property.floorPlan.description || "Property floor plan"}</p>
            <a className="secondary-btn" href={property.floorPlan.floorPlanURL} target="_blank" rel="noreferrer">
              Open floor plan
            </a>
          </div>
        )}
      </div>
    </section>
  );
}