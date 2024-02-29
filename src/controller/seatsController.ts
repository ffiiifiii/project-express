import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

/**create a object of prisma */
const prisma = new PrismaClient

/**create a function to "create" new event */
/**asyncronus = fungsi yang berjalan secara pararel */
const seats = async (request: Request, response: Response) => {
    try {
        /**read request body  */
        const eventId = Number(request.body.eventId)
        const rowNum = request.body.rowNum
        const seatNum = Number(request.body.seatNum)
        const status = request.body.status

        /**insert to events table using prisma*/
        const newData = await prisma.seats.create({
            data:{
                eventId: eventId,
                rowNum: rowNum,
                seatNum: seatNum,
                status: status 
            }
        })
        return response.status(200).json({
            status: true,
            message: `seats has been created`,
            data: newData
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

/**create function to READ events */
const readSeats = async (request: Request, response: Response) => {
    try {
        const dataSeats = await prisma.seats.findMany()
        return response.status(200).json({
            status: true,
            message: `events has been loaded`,
            data: dataSeats
        })
    } catch (error) {
        return response.status(200).json({
            status: false,
            message: error
        })
    }
}

const updateSeats = async (request: Request, response: Response) => {
    try {
        const seatId = request.params.seatId
        const eventid = request.params.eventId
        /**read data perubahannya */
        const rowNum = request.body.rowNum
        const seatNum = Number(request.body.seatNum)
        const status = request.body.status

        /**make sure that data has exist */
        /**find first= mengembalikan satu objek */
        const findSeat = await prisma.seats.findFirst({
            where: { seatId: Number(seatId) }
        })
        if (!findSeat) {
            /**a give a respon when event not found */
            return response.status(400).json({
                status: false,
                message: `data seat not found`
            })
        }

        const dataSeats = await prisma.seats.update({
            where: { seatId: Number(seatId) },
            data: {
                rowNum: rowNum || findSeat.rowNum,
                seatNum: seatNum || findSeat.seatNum,
                status: status || findSeat.seatNum
            }
        })

        return response.status(200).json({
            status: true,
            message: `Seats has been update`,
            data: dataSeats
        })

    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

/**create to function to delete event */
const deleteSeats =async (request: Request, response: Response) => {
    try {
        /**get eventid from URL */
        const seatId = request.params.seatId

         /**make sure event is exist */
         const findSeat = await prisma.seats.findFirst({
            where: { seatId: Number(seatId)}
         })

         if(!findSeat){
            return response.status(400).json({
                status: false,
                message: `seat not found`
            })
         }

         /**execute for delete event */
         const dataSeats = await prisma.seats.delete({
            where: {seatId: Number(seatId)}
         })

         return response.status(200).json({
            status: true,
            message: `seats has been delete`
         })

    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
    })
}
}

export {seats, readSeats, updateSeats, deleteSeats}