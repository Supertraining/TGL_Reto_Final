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
      const availableRooms = await this.model.find({
        unavailableDates: { $not: { $elemMatch: { $in: dates.map(date => new Date(date).getTime()) } } }
      });

      return availableRooms.length > 0 ? availableRooms : null;
    } catch (error) {
      throw new Error(`Error in findAvailableRoom: ${error.message}`);
    }
  }

  async deleteRoom(roomId) {
    try {
      const deletedRoom = await this.model.findByIdAndDelete(roomId);
      if (!deletedRoom) {
        throw new Error(`Room with ID ${roomId} not found`);
      }
      return deletedRoom;
    } catch (error) {
      throw new Error(`Error in deleteRoom: ${error.message}`);
    }
  }

  async updateReservation(reservationId, data) {
    try {
      const updatedReservation = await this.model.findOneAndUpdate(
        { 'reservations._id': reservationId },
        { $set: { 'reservations.$': data } },
        { new: true }
      );

      if (!updatedReservation) {
        throw new Error(`Reservation with ID ${reservationId} not found`);
      }

      return updatedReservation;
    } catch (error) {
      throw new Error(`Error in updateReservation: ${error.message}`);
    }
  }

  async createReservation(data) {
    try {
      const { roomId, reservation } = data;
      const updatedRoom = await this.model.findByIdAndUpdate(
        roomId,
        { $push: { reservations: reservation } },
        { new: true }
      );

      if (!updatedRoom) {
        throw new Error(`Room with ID ${roomId} not found`);
      }

      return updatedRoom;
    } catch (error) {
      throw new Error(`Error in createReservation: ${error.message}`);
    }
  }

  async updateRoom(roomId, data) {
    try {
      const updatedRoom = await this.model.findByIdAndUpdate(roomId, { $set: data }, { new: true });

      if (!updatedRoom) {
        throw new Error(`Room with ID ${roomId} not found`);
      }

      return updatedRoom;
    } catch (error) {
      throw new Error(`Error in updateRoom: ${error.message}`);
    }
  }

}

module.exports = RoomService;