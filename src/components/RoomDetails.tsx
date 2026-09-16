import type { Room } from "../types";
import { formatArea } from "../utils";

export default function RoomDetails({ room }: { room?: Room }) {
  if (!room) {
    return <div className="empty-detail">Select a room to see its details.</div>;
  }

  return (
    <div className="room-detail">
      <div className="eyebrow">ROOM INFO</div>
      <h3>{room.displayName}</h3>
      <div className="room-area">{formatArea(room.areaSqFt)}</div>
      <p>{room.description}</p>
      <div className="feature-box">
        <strong>Features</strong>
        <p>{room.features || "No features listed."}</p>
      </div>
    </div>
  );
}