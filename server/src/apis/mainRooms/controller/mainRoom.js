class MainRoomController {
  constructor(mainRoomService) {
    this.mainRoomService = mainRoomService;
  }

  getAll = async (req, res, next) => {
    try {
      const rooms = await this.mainRoomService.getAll();
      res.json(rooms);
    } catch (error) {
      next(error);
    }
  };

  createRoom = async (req, res, next) => {
    try {
      const room = await this.mainRoomService.createRoom(req.body);
      res.json(room);
    } catch (error) {
      next(error);
    }
  };

  deleteRoom = async (req, res, next) => {
    try {
      const { roomId } = req.params;
      const result = await this.mainRoomService.deleteRoom(roomId);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  updateRoom = async (req, res, next) => {
    try {
      const { roomId } = req.params;
      const updatedRoom = await this.mainRoomService.updateRoom(roomId, req.body);
      res.json(updatedRoom);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = MainRoomController;