import { useEffect, useState } from "react";
import { WEBSOCKET_URL } from "../config";

export function useSocket() {
  const [loading, setLoading] = useState(false);
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL);

    ws.onopen = () => {
      setLoading(false);
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      console.log(event.data);
    };
  }, []);

  return { socket, loading };
}
