const createError = require('../../../utils/error.creator');

class MainRoomService {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    try {
      const rooms = await this.model.find();
      return rooms;
    } catch (error) {
      throw error;
    }
  }

  async createRoom(data) {
    try {
      const newRoom = new this.model(data);
      const savedRoom = await newRoom.save();
      return savedRoom;
    } catch (error) {
      throw error;
    }
  }

  async deleteRoom(roomId) {
    try {

      const deletedRoom = await this.model.findByIdAndDelete(roomId);

      if (!deletedRoom) {
        throw createError(404, `Room with ID ${roomId} not found`);
      }
      return deletedRoom;
    } catch (error) {
      throw error;
    }
  }


  async updateRoom(roomId, data) {
    try {
      const updatedRoom = await this.model.findByIdAndUpdate(roomId, { $set: data }, { new: true });

      if (!updatedRoom) {
        throw createError(404, `Room with ID ${roomId} not found`);
      }

      return updatedRoom;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = MainRoomService 
  
