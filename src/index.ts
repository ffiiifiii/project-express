/** ini adalah file utama dimana ada proses menjalankan server backend */

/**memanggil libary express */

import express, { Request, Response } from "express"
import { validateCube } from "./middleware/validateCube"
import routeBangunDatar from "./route/bangunDatar"
import routeBangunRuang from "./route/bangunRuang"

//**buat wadah untuk inisiasi express */
const app = express()

//**mendefinisikan PORT berjalannya server */
const PORT = 8000

/**allow to read JSON as request */
app.use(express.json())

//** proses pertama untuk handle request */
app.get(`/serena`,(request: Request, response: Response)=>{
//**ini adalah proses handle request dengan url/address: http://localhost:8000/serena method : GET*/
//**memberi respone return*/
return response.status(200).json({
    message: `p balap` 
})
})

/** read query request*/
app.get(`/moklet`,(request: Request, response: Response)=>{
    let nama: any = request.query.nama?.toString()
    let umur: any = request.query.umur?.toString()

    let message: string = `My name is ${nama} and i'm ${umur} years old`
    return response.status(200).json(message)
})

/**read data request from parameter */
app.get(`/telkom/:nama/:gender`,(request: Request, response: Response)=>{
    let nama: string = request.params.nama
    let gender: string = request.params.gender
    
    let message: string = `my name is ${nama} and i'm ${gender}`
    return response.status(200).json(message)
})

/**read a request from body */
app.post(`/moklet`, (request: Request, response: Response)=>{
    /**asumsikan data yang dikirim adalah panjang dan lebar */
    let panjang: number = request.body.panjang
    let lebar: number = request.body.lebar

    let luaspersegipanjang: number = panjang*lebar
    let message = `luas persegi panjang adalah ${luaspersegipanjang}`
    return response.status(200).json(message)
})

app.get(`/suhu/:celcius`,(request: Request, response: Response)=>{
    let celcius: number = Number(request.params.celcius)
    let farenhit: number = 9/5*celcius+32
    let kelvin: number = celcius +273
    let reamur: number = 4/5 * celcius
    
    let message = `farenhit ${farenhit}, kelvin = ${kelvin}, reamur = ${reamur}`
    return response.status(200).json(message)
})

/**creat request for count volume of balok */
app.post(`/balok`,validateCube,(request: Request, response: Response)=>{
    /**read panjang lebar tinggi */
    let panjang: number = Number(request.body.panjang)
    let lebar: number = Number(request.body.lebar)
    let tinggi: number = Number(request.body.tinggi)

    let volumebalok: number = panjang*lebar*tinggi
    return response.status(200).json({
        panjang, lebar, tinggi, volumebalok
    })
})

/**register route of bangun datar */
app.use(routeBangunDatar)

/**register route of bangun ruang */
app.use(routeBangunRuang)

//**run */
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})

