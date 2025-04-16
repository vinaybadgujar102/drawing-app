"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

export function ChatRoomClient({
  messages,
  roomId,
}: {
  messages: { message: string; id: string }[];
  roomId: string;
}) {
  const [chats, setChats] = useState(messages);
  const { socket, loading } = useSocket();

  const [currentMessage, setCurrentMessage] = useState("");

  useEffect(() => {
    if (socket && !loading) {
      socket.send(
        JSON.stringify({
          type: "join_room",
          roomId,
        })
      );

      socket.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        if (parsedData.type === "chat") {
          setChats((prev) => [...prev, parsedData.message]);
        }
      };
    }
  }, [socket, loading, roomId]);

  const handleSendMessage = () => {
    socket.send(
      JSON.stringify({
        type: "chat",
        message: currentMessage,
        roomId,
      })
    );
    setCurrentMessage("");
  };

  return (
    <div>
      {chats.map((message: { message: string; id: string }) => (
        <div key={message.id}>{message.message}</div>
      ))}

      <input
        type="text"
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send message</button>
    </div>
  );
}
