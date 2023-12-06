const router = require('express').Router()
const RoomController = require('../controller/room');
const RoomService = require('../service/room');
const models = require('../../db/mongodb/models/room')
class RoomRouter {
  constructor() {
    const roomService = new RoomService(models);
    const roomController = new RoomController(roomService);

    router.get('/', roomController.getAll);
    router.post('/availability', roomController.findAvailableRoom);
    router.post('/', roomController.createRoom);
    router.delete('/:roomId', roomController.deleteRoom);
    router.patch('/reservation/:reservationId', roomController.updateReservation);
    router.put('/reservation', roomController.createReservation);
    router.put('/:roomId', roomController.updateRoom);
  }

  getRouter()
  {
    return router
  }
}

module.exports = RoomRouter;