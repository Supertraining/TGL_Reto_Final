const router = require('express').Router()
const RoomController = require('../controller/room');
const RoomService = require('../service/room');
const models = require('../../../db/mongodb/models/room')
const validate = require('../../../middlewares/dataValidation')
const isAuthenticated = require('../../../middlewares/authValidation');
const authorize = require('../../../middlewares/roleValidation');

class RoomRouter {
  constructor() {
    const roomService = new RoomService(models);
    const roomController = new RoomController(roomService);


    router.post('/availability', validate.availableRooms, roomController.findAvailableRoom);

    router.use(isAuthenticated)
    
    router.put('/reservation', validate.reservation, roomController.createReservation);

    router.get('/', authorize('admin'), roomController.getAll);
    router.post('/', authorize('admin'), validate.room, roomController.createRoom);
    router.delete('/:roomId', authorize('admin'), roomController.deleteRoom);
    router.put('/:roomId', authorize('admin'), validate.room, roomController.updateRoom);
  }

  getRouter() {
    return router
  }
}

module.exports = RoomRouter;