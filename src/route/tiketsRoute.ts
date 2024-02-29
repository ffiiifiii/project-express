import express from "express"
import {  deleteTickets, readTikets, tikets, updateTickets } from "../controller/tiketsController"
const app = express()

/**allow to read a json from body */
app.use(express.json())

/**addres from get event data */
app.get(`/tikets`, readTikets)
/**addres from add new event */
app.post(`/tikets`, tikets)
app.put(`/tikets/:tiketId`, updateTickets)
/**address for delete event */
app.delete(`/tikets/:tiketId`, deleteTickets)
export default app