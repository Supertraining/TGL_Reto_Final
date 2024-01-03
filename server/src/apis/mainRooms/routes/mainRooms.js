const router = require('express').Router()
const MainRoomController = require('../controller/mainRoom');
const MainRoomService = require('../service/mainRoom');
const models = require('../../../db/mongodb/models/mainRoom')
const validate = require('../../../middlewares/dataValidation')
const isAuthenticated = require('../../../middlewares/authValidation');
const authorize = require('../../../middlewares/roleValidation');

class MainRoomRouter {
  constructor() {
    const mainRoomService = new MainRoomService(models);
    const mainRoomController = new MainRoomController(mainRoomService);


    router.get('/', mainRoomController.getAll);

    router.use(isAuthenticated)

    router.post('/', authorize('admin'), validate.mainRoom, mainRoomController.createRoom);
    router.delete('/:roomId', authorize('admin'), mainRoomController.deleteRoom);
    router.put('/:roomId', authorize('admin'), validate.mainRoom, mainRoomController.updateRoom);
  }

  getRouter() {
    return router
  }
}

module.exports = MainRoomRouter;