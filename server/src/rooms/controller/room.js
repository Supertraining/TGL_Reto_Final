class RoomController {
  constructor(roomService) {
    this.roomService = roomService
  }

  getAll = async (req, res) => {
    try {

      const rooms = await this.roomService.getAll()
      res.json(rooms)

    } catch (error) {
      console.error(error)
    }
  }
  createRoom = async (req, res) => {
    try {

      const room = await this.roomService.createRoom(req.body)
      res.json(room)

    } catch (error) {
      console.error(error)
    }
  }
  findAvailableRoom = async (req, res) => {

    try {
      const { selectedDates } = req.body
      console.log(selectedDates)
      const availableRooms = await this.roomService.findAvailableRoom(selectedDates)
      res.json(availableRooms)

    } catch (error) {
      console.error(error)
    }
  }

}


module.exports = RoomController;