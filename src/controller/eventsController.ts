import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { date } from "joi"

/**create a object of prisma */
const prisma = new PrismaClient

/**create a function to "create" new event */
/**asyncronus = fungsi yang berjalan secara pararel */
const event = async (request: Request, response: Response) => {
    try {
        /**read request body  */
        const eventName = request.body.eventName
        const eventDate = new Date(request.body.eventDate).toISOString()
        const venue = request.body.venue
        const price = Number(request.body.price)

        /**insert to events table using prisma*/
        const newData = await prisma.events.create({
            data: {
                eventName: eventName,
                eventDate: eventDate,
                venue: venue,
                price: price
            }
        })
        return response.status(200).json({
            status: true,
            message: `events has been created`,
            data: newData
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}
//pagination: membatasi jumlah data, harus tau page dan quantity

/**create function to READ events */
const readEvents = async (request: Request, response: Response) => {
    try {
        const page = Number(request.query.page) ||1;
        const qty = Number(request.query.qty) ||10;
        const keyword = request.query.keyword?.toString()||"";
        const dataEvents = await prisma.events.findMany({
            /**pagination */
            take: qty, //mendefinisikan jumlah data yang diambil
            skip: (page - 1) * qty, //untuk melewati
            /**searching */
            where: {
                OR: [
                    {eventName: {contains: keyword}},
                    {venue: {contains: keyword}},
                ]
            },
            orderBy:{eventName:"asc"}
        })
        return response.status(200).json({
            status: true,
            message: `events has been loaded`,
            data: dataEvents
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

/**function from update event */
/**update data mengetahui data yang akan diupdate dari primary key, 
 * menyiapkan data perubahannya
*/

const updateEvent = async (request: Request, response: Response) => {
    try {
        const eventId = request.params.eventId
        /**read data perubahannya */
        const eventName = request.body.eventName
        const eventDate = new Date(request.body.eventDate).toISOString()
        const price = Number(request.body.price)
        const venue = request.body.venue

        /**make sure that data has exist */
        /**find first= mengembalikan satu objek */
        const findEvent = await prisma.events.findFirst({
            where: { eventId: Number(eventId) }
        })
        if (!findEvent) {
            /**a give a respon when event not found */
            return response.status(400).json({
                status: false,
                message: `data event not found`
            })
        }

        const dataEvent = await prisma.events.update({
            where: { eventId: Number(eventId) },
            data: {
                eventName: eventName || findEvent.eventName,
                eventDate: eventDate || findEvent.eventDate,
                price: price || findEvent.price,
                venue: venue || findEvent.venue
            }
        })

        return response.status(200).json({
            status: true,
            message: `event has been update`,
            data: dataEvent
        })

    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

/**create to function to delete event */
const deleteEvents = async (request: Request, response: Response) => {
    try {
        /**get eventid from URL */
        const eventId = request.params.eventId

         /**make sure event is exist */
         const findEvents = await prisma.events.findFirst({
            where: { eventId: Number(eventId)}
         })

         if(!findEvents){
            return response.status(400).json({
                status: false,
                message: `event not found`
            })
         }

         /**execute for delete event */
         const dataEvent = await prisma.events.delete({
            where: {eventId: Number(eventId)}
         })

         return response.status(200).json({
            status: true,
            message: `data event has been delete`
         })

    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
    })
}
}


export { event, readEvents, updateEvent, deleteEvents }