import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { ChatRoomClient } from "./ChatRoomClient";

async function getChats(roomId: string) {
  const respone = await axios.get(`${BACKEND_URL}/chats/${roomId}`);
  return respone.data.messages;
}

export async function ChatRoom({ roomId }: { roomId: string }) {
  const messages = await getChats(roomId);

  return <ChatRoomClient messages={messages} roomId={roomId} />;
}
