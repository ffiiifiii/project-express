import express from "express"
import { luaspermukaanBalok, luaspermukaanBola, luaspermukaanKubus, luaspermukaanTabung, volumeBalok, volumeBola, volumeKubus, volumeTabung } from "../controller/bangunRuang"
import { validateBalok } from "../middleware/validateBalok"
import { validateTabung } from "../middleware/validateTabung"
import { validateKubus } from "../middleware/validateKubus"
import { validateBola } from "../middleware/validateBola"
const app = express()

app.use(express.json())

app.post(`/tabung/volume`, validateTabung,volumeTabung)
app.post(`/tabung/luaspermukaan`, validateTabung,luaspermukaanTabung)
app.post(`/kubus/volume`, validateKubus,volumeKubus)
app.post(`/kubus/luaspermukaan`, validateKubus,luaspermukaanKubus)
app.post(`/balok/volume`, validateBalok,volumeBalok)
app.post(`/balok/luaspermukaan`, validateBalok,luaspermukaanBalok)
app.post(`/bola/volume`, validateBola,volumeBola)
app.post(`/bola/luaspermukaan`, validateBola,luaspermukaanBola)
export default app
