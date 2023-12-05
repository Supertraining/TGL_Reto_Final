class RoomService {

  constructor(model) {
    this.model = model
  }

  async getAll() {
    try {

      const rooms = await this.model.find()
      return rooms

    } catch (error) {
      console.error(error)
    }
  }
  async createRoom(data) {
    try {
      const newRoom = new this.model(data)
      const savedRoom = await newRoom.save()
      return savedRoom

    } catch (error) {
      console.error(error)
    }
  }
  async findAvailableRoom(dates) {
    try {

      const rooms = await this.getAll();

      const availableRooms = rooms.filter((room) =>
        !room.unavailableDates.some((date) =>
          dates.includes(new Date(date).getTime())
        )
      );

      return availableRooms.length > 0 ? availableRooms : null;

    } catch (error) {
      console.error(error)
    }
  }

}

module.exports = RoomService;