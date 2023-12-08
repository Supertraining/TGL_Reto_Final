const router = require('express').Router()
const RoomController = require('../controller/room');
const RoomService = require('../service/room');
const models = require('../../db/mongodb/models/room')
const validate = require('../../middlewares/dataValidation')
class RoomRouter {
  constructor() {
    const roomService = new RoomService(models);
    const roomController = new RoomController(roomService);

    router.get('/', roomController.getAll);
    router.post('/availability', validate.availableRooms, roomController.findAvailableRoom);
    router.post('/', validate.room, roomController.createRoom);
    router.delete('/:roomId', roomController.deleteRoom);
    router.put('/reservation', validate.reservation, roomController.createReservation);
    router.put('/:roomId', validate.room, roomController.updateRoom);
  }

  getRouter()
  {
    return router
  }
}

module.exports = RoomRouter;