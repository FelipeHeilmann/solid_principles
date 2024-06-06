import Room from "../entity/Room";

export default interface RoomRepository {
    get(id: string): Promise<Room>
}



