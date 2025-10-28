import type { SocketEvents } from "@/common/constants";
import { getSocket } from "./getSocket.ts";

export const subscribeToEvent = <T>(
  event: SocketEvents,
  callback: (data: T) => void,
) => {
  console.log("2");
  const socket = getSocket();
  // debugger;
  // ✅ Лог в консоль, чтобы убедиться, что подключение установлено.
  socket.on(event, callback);
  console.log("4");

  return () => {
    console.log("5");
    socket.off(event, callback);
  };
};
