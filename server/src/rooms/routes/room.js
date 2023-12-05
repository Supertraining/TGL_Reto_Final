const router = require('express').Router()
const RoomController = require('../controller/room');
const RoomService = require('../service/room');
const models = require('../../db/mongodb/models/room')
class RoomRouter {
  constructor() {
    const roomService = new RoomService(models);
    const roomController = new RoomController(roomService);

    router.get('/', roomController.getAll);
    router.post('/availableRooms', roomController.findAvailableRoom);
    router.post('/', roomController.createRoom);
    
  }

  getRouter()
  {
    return router
  }
}

module.exports = RoomRouter;