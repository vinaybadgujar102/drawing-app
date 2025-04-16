import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [roomId, setRoomId] = useState<string>("");

  const router = useRouter();

  const handleJoinRoom = () => {
    router.push(`/room/${roomId}`);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div>
        <input
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginLeft: "10px",
          }}
          onClick={handleJoinRoom}
        >
          Join room
        </button>
      </div>
    </div>
  );
}
