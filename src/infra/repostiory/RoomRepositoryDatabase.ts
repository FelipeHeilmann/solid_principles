import Room from "../../domain/entity/Room";
import RoomRepository from "../../domain/repository/RoomRepository";
import DatabaseConnection from "../database/DatabaseConnection";
import { NotFound } from "../exceptions/InfraExceptions";

export default class RoomRepositoryDatabase implements RoomRepository {
    constructor(readonly connection: DatabaseConnection) {
    }
    
    async get(id: string): Promise<Room> {
       const [roomData] = await this.connection.query("select * from solid.rooms where id = $1", [id]);
       if(!roomData) throw new NotFound("Room")
        return new Room(roomData.room_id, roomData.category, roomData.type, parseFloat(roomData.price))
    }
}