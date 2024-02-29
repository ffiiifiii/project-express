import express from "express"
import { deleteEvents, event, readEvents, updateEvent } from "../controller/eventsController"
const app = express()

/**allow to read a json from body */
app.use(express.json())

/**addres from get event data */
app.get(`/event`, readEvents)
/**addres from add new event */
app.post(`/event`, event)
/**address for update event */
app.put(`/event/:eventId`, updateEvent)
/**address for delete event */
app.delete(`/event/:eventId`, deleteEvents)
export default app