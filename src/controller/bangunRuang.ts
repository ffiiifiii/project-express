import { Request, Response, response } from "express"

const volumeTabung = (request: Request, response: Response) => {
    try {
        const phi = Math.PI
    const r: number = Number(request.body.r)
    const t: number = Number(request.body.t)

    const luas = phi * r * r * t

    return response.status(200).json({
        status: true,
        r,
        t,
        luas
    })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

const luaspermukaanTabung = (request: Request, response: Response) => {
    try {
    const phi = Math.PI
    const r: number = Number(request.body.r)
    const t: number = Number(request.body.t)

    const lp = (2 * phi * r) * (r + t)

    return response.status(200).json({
        status: true,
        r,
        t,
        lp
    })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

const volumeKubus = (request: Request, response: Response) => {
    try {
    const s: number = Number(request.body.s)

    const luas = s * s * s

    return response.status(200).json({
        status: true,
        s,
        luas
    })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

const luaspermukaanKubus = (request: Request, response: Response) => {
    try {
    const s: number = Number(request.body.s)

    const lp = 6 * s * s 

    return response.status(200).json({
        status: true,
        s,
        lp
    })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

const volumeBalok = (request: Request, response: Response) => {
    try {
    const p: number = Number(request.body.p)
    const l: number = Number(request.body.l)
    const t: number = Number(request.body.t)

    const volume = p * l * t

    return response.status(200).json({
        status: true,
        p,
        l,
        t,
        volume
    })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

const luaspermukaanBalok = (request: Request, response: Response) => {
    try {
    const p: number = Number(request.body.p)
    const l: number = Number(request.body.l)
    const t: number = Number(request.body.t)

    const lp = 2 * (p * l + p * t + l * t)

    return response.status(200).json({
        status: true,
        p,
        l,
        t,
        lp
    })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

const volumeBola = (request: Request, response: Response) => {
    try {
    const phi = Math.PI
    const r: number = Number(request.body.r)

    const volume = 4/3 * phi * r * r * r

    return response.status(200).json({
        status: true,
        r,
        volume
    })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

const luaspermukaanBola = (request: Request, response: Response) => {
    try {
    const phi = Math.PI
    const r: number = Number(request.body.r)

    const lp = 4 * phi * r * r 

    return response.status(200).json({
        status: true,
        r,
        lp
    })
    } catch (error) {
        return response.status(500).json({
            status: false,
            message: error
        })
    }
}

export {volumeTabung, luaspermukaanTabung, volumeKubus, luaspermukaanKubus, volumeBalok, luaspermukaanBalok, volumeBola, luaspermukaanBola}