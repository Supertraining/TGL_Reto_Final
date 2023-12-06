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
      
      const availableRooms = await this.roomService.findAvailableRoom(selectedDates)
      
      res.json(availableRooms)

    } catch (error) {
      console.error(error)
    }
  }

  deleteRoom = async (req, res) => {
    try {
      const { roomId } = req.params;
      const result = await this.roomService.deleteRoom(roomId);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  updateReservation = async (req, res) => {
    try {
      const { reservationId } = req.params;
      const updatedReservation = await this.roomService.updateReservation(reservationId, req.body);
      res.json(updatedReservation);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  createReservation = async (req, res) => {
    try {

      const newReservation = await this.roomService.createReservation(req.body);
    
      res.send('Room reservation was created successfully')     

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  updateRoom = async (req, res) => {
    try {
      const { roomId } = req.params;
      const updatedRoom = await this.roomService.updateRoom(roomId, req.body);
      res.json(updatedRoom);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

}


module.exports = RoomController;