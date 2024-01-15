import express from "express"
import { kelilingLingkaran, kelilingPersegi, kelilingPersegiPanjang, luasLingkaran, luasPersegi, luasPersegiPanjang, luasSegitiga } from "../controller/bangunDatar"
import { validateLingkaran } from "../middleware/validateLingkaran"
import { validatePersegi } from "../middleware/validatePersegi"
import { validatePersegiPanjang } from "../middleware/validatePersegiPanjang"
import { validateSegitiga } from "../middleware/validateSegitiga"
const app = express()

/**allow read a body  */
/**fungsi use digunakan untuk menerapkan sebuah fungsi pada object express, 
 * fungsi tsb akan otomatis dijalankan */
app.use(express.json())

app.post(`/lingkaran/luas`, validateLingkaran,luasLingkaran)
app.post(`/lingkaran/keliling`, validateLingkaran,kelilingLingkaran)
app.post(`/persegi/luas`, validatePersegi,luasPersegi)
app.post(`/persegi/keliling`, validatePersegi,kelilingPersegi)
app.post(`/persegipanjang/luas`, validatePersegiPanjang, luasPersegiPanjang)
app.post(`/persegipanjang/keliling`, validatePersegiPanjang,kelilingPersegiPanjang)
app.post(`/segitiga/luas`, validateSegitiga,luasSegitiga)
export default app