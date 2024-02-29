import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import md5 from "md5"
import { sign } from "jsonwebtoken"
/**create a object of prisma */
const prisma = new PrismaClient

/**create a function to "create" new event */
/**asyncronus = fungsi yang berjalan secara pararel */
const user = async (request: Request, response: Response) => {
    try {
        /**read request body  */
        const firstname = (request.body.firstname);
        const lastname = (request.body.lastname);
        const email = (request.body.email);
        const password = md5(request.body.password);
        const role = (request.body.role);

        /**insert to events table using prisma*/
        const newData = await prisma.user.create({
            data: {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                role: role
            }
        })
        return response.status(200).json({
            status: true,
            message: `user has been created`,
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
const readUser = async (request: Request, response: Response) => {
    try {
        const dataUser = await prisma.events.findMany()
        return response.status(200).json({
            status: true,
            message: `user has been loaded`,
            data: dataUser
        })
    } catch (error) {
        return response.status(200).json({
            status: false,
            message: error
        })
    }
}

const updateUser = async (request: Request, response: Response) => {
    try {
        const userId = (request.params.userId);
        const firstname = (request.body.firstname);
        const lastname = (request.body.lastname);
        const email = (request.body.email);
        const password = md5(request.body.password);
        const role = (request.body.role);

        const findUser = await prisma.user.findFirst({
            where: { userId: Number(userId) }
        })

        if (!findUser) {
            return response.status(400)
                .json({
                    status: false,
                    message: "Data user not found"
                })
        }

        const dataUser = await prisma.user.update({
            where: { userId: Number(userId) },
            data: {
                firstname: firstname || findUser.firstname,
                lastname: lastname || findUser.lastname,
                email: email || findUser.email,
                password: password || findUser.password,
                role: role || findUser.role
            }
        })

        return response.status(200)
            .json({
                status: true,
                message: "User has been update",
                data: dataUser
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

const deleteUser = async (request: Request, response: Response) => {
    try {
        const userId = request.params.userId

        const findUser = await prisma.user.findFirst({
            where: { userId: Number(userId) }
        })

        if (!findUser) {
            return response
                .status(200)
                .json({
                    status: false,
                    message: "User not found"
                })
        }

        const dataUsers = await prisma.user.delete({
            where: { userId: Number(userId) }
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

const login = async (request: Request, response: Response) => {
    try {
        const email = request.body.email
        const password = md5 (request.body.password)
        const user = await prisma.user.findFirst(
            {
                where : {email: email, password: password}
            }
        )
        if (user) {
            const payload = user
            const secretkey = "fidifidi"
            const token = sign(payload, secretkey)
            return response.status(200).json({
                status: true,
                message: "login berhasil",
                token: token
            })
        } else{
            return response.status(200).json ({
                status: false,
                message: "login gagal"
            })
                }

    } catch (error) {
        return response
            .status(500)
            .json({
                status: false,
                message: error
            })
    }
}

export { user, readUser, updateUser, deleteUser, login }