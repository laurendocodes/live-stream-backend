import { Socket } from "socket.io";

export class JoinRoomDTO {
    streamId!: string;
    userId!: string;
}

export class SendMessageDTO {
  userId!: string
  message!: string
  streamId!: string
}

export class SocketMapUsers {
  id!: string
  name!: string
  avatarUrl?: string | null
  socketId!: string
  roomId!: string
  userId!: string
  client!: Socket
}