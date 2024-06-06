import RoomRepository from "../../domain/repository/RoomRepository"
import Room from "../../domain/entity/Room"

export class RoomRepositoryMemory implements RoomRepository {
    private rooms: Room[]

    constructor() {
        this.rooms = [
            new Room("aa354842-59bf-42e6-be3a-6188dbb5fff8", "suit", "day", 100),
            new Room("d5f5c6cb-bf69-4743-a288-dafed2517e38", "regular", "hour", 50)
        ]
    }
    
    async get(id: string): Promise<Room> {
       const room = this.rooms.find(room => room.id === id)
       if(!room) throw new Error("Room not found")
        return room
    }
}