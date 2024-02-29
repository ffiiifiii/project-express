import express from "express"
import { deleteSeats, readSeats, seats, updateSeats } from "../controller/seatsController"
const app = express()

/**allow to read a json from body */
app.use(express.json())

/**addres from get event data */
app.get(`/seats`, readSeats)
/**addres from add new event */
app.post(`/seats`, seats)
app.put(`/seats/:seatId`, updateSeats)
/**address for delete event */
app.delete(`/seats/:seatId`, deleteSeats)

export default app