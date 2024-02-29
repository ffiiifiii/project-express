import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import { stat } from "fs"

/**create a object of prisma */
const prisma = new PrismaClient

/**create a function to "create" new event */
/**asyncronus = fungsi yang berjalan secara pararel */
const tikets = async (request: Request, response: Response) => {
    try {
        /**read request body  */
        const eventId = Number(request.body.eventId)
        const userId = Number(request.body.userId)
        const seatId = Number(request.body.seatId)
        const bookedDate = new Date(request.body.bookedDate).toISOString()

        /**insert to events table using prisma*/
        const newData = await prisma.tickets.create({
            data: {
                eventId: eventId,
                userId: userId,
                seatId: seatId,
                bookedDate: bookedDate
            }
        })

        return response.status(200).json({
            status: true,
            message: `tikets has been created`,
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
const readTikets = async (request: Request, response: Response) => {
    try {
        const dataTikets = await prisma.tickets.findMany()
        return response.status(200).json({
            status: true,
            message: `tikets has been loaded`,
            data: dataTikets
        })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

const updateTickets = async (request: Request, response: Response) => {
    try {
        const ticketId = request.params.ticketId

        const eventId = Number(request.body.eventId)
        const userId = Number(request.body.userId)
        const seatId = Number(request.body.seatId)
        const bookedDate = new Date(request.body.bookedDate).toISOString()

        const findTicket = await prisma.tickets.findFirst({
            where: { ticketId: Number(ticketId) }
        })

        if (!findTicket) {
            return response.status(400)
                .json({
                    status: false,
                    message: "Data ticket not found"
                })
        }

        const dataTickets = await prisma.tickets.update({
            where: { ticketId: Number(ticketId) },
            data: {
                eventId: eventId || findTicket.eventId,
                userId: userId || findTicket.userId,
                seatId: seatId || findTicket.seatId,
                bookedDate: bookedDate || findTicket.bookedDate
            }
        })

        return response.status(200)
            .json({
                status: true,
                message: "Tickets has been update",
                data: dataTickets
            })
    } catch (error) {
        return response
            .status(500)
            .json({
                status: false,
                message: error
            })
    }
}

const deleteTickets = async (request: Request, response: Response) => {
    try {
        const ticketID = request.params.ticketId

        const findTicket = await prisma.tickets.findFirst({
            where: { ticketId: Number(ticketID) }
        })

        if (!findTicket) {
            return response
                .status(200)
                .json({
                    status: false,
                    message: "Ticket not found"
                })
        }

        const dataTickets = await prisma.tickets.delete({
            where: { ticketId: Number(ticketID) }
        })

        return response.status(200)
            .json({
                status: true,
                message: "data has been delete"
            })
    } catch (error) {
        return response
            .status(500)
            .json({
                status: false,
                message: error
            })
    }
}


export { tikets, readTikets, updateTickets, deleteTickets }