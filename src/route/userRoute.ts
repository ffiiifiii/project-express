import express from "express"
import { deleteUser, readUser, updateUser, user, login } from "../controller/usersController"
import { verifyUser } from "../middleware/verifyUser"
const app = express()

/**allow to read a json from body */
app.use(express.json())

/**addres from get event data */
app.get(`/user`, verifyUser,readUser)
/**addres from add new event */
app.post(`/user`, verifyUser,user)
app.put(`/user/:userId`, verifyUser,updateUser)
/**address for delete event */
app.delete(`/user/:userId`, verifyUser,deleteUser)
app.post(`/user/login`, login)
export default app