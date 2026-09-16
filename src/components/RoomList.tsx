import type { Room } from "../types";
import { formatArea } from "../utils";

export default function RoomList({
  rooms,
  selected,
  onSelect,
}: {
  rooms: Room[];
  selected?: Room;
  onSelect: (room: Room) => void;
}) {
  return (
    <div className="room-list">
      {rooms.map((room) => (
        <button
          key={room.roomId}
          className={`room-item ${selected?.roomId === room.roomId ? "active" : ""}`}
          onClick={() => onSelect(room)}
        >
          <div>
            <strong>{room.displayName}</strong>
            <span>{formatArea(room.areaSqFt)}</span>
          </div>
          <span>›</span>
        </button>
      ))}
    </div>
  );
}