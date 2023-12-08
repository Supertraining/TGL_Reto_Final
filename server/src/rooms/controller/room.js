class RoomController {
  constructor(roomService) {
    this.roomService = roomService;
  }

  getAll = async (req, res, next) => {
    try {
      const rooms = await this.roomService.getAll();
      res.json(rooms);
    } catch (error) {
      next(error);
    }
  };

  createRoom = async (req, res, next) => {
    try {
      const room = await this.roomService.createRoom(req.body);
      res.json(room);
    } catch (error) {
      next(error);
    }
  };

  findAvailableRoom = async (req, res, next) => {
    try {
      const { selectedDates } = req.body
      
      const availableRooms = await this.roomService.findAvailableRoom(selectedDates)
      
      res.json(availableRooms)

    } catch (error) {
      next(error);
    }
  };

  deleteRoom = async (req, res, next) => {
    try {
      const { roomId } = req.params;
      const result = await this.roomService.deleteRoom(roomId);
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  updateReservation = async (req, res, next) => {
    try {
      const { reservationId } = req.params;
      const updatedReservation = await this.roomService.updateReservation(reservationId, req.body);
      res.json(updatedReservation);
    } catch (error) {
      next(error);
    }
  };

  createReservation = async (req, res, next) => {
    try {
      const newReservation = await this.roomService.createReservation(req.body);
      res.status(201).json({ message: 'Room reservation was created successfully' });
    } catch (error) {
      next(error);
    }
  };

  updateRoom = async (req, res, next) => {
    try {
      const { roomId } = req.params;
      const updatedRoom = await this.roomService.updateRoom(roomId, req.body);
      res.json(updatedRoom);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = RoomController;