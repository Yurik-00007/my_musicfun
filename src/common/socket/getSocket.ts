import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = () => {
  console.log("3");
  if (!socket) {
    socket = io(import.meta.env.VITE_SOCKET_URL, {
      path: "/api/1.0/ws", // путь, на котором сервер слушает WebSocket-подключения(по умолчанию socket.io)
      transports: ["websocket"], // используем только WebSocket без fallback на long polling
    });
    socket.on("connect", () => console.log("✅ Socket connected to server."));
    socket.on("disconnect", () => {
      console.log("❌ Connection destroyed.");
    });
  }

  return socket;
};
