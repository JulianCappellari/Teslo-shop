'use server'

import prisma from '@/lib/prisma'

export const setTranssaccionId = async(ordenId:string, transaccionId: string)=> {
    try {
        const orden = await prisma.orden.update({
            where: {id: ordenId},
            data: {
                transaccionId: transaccionId
            }
        })

        if(!orden) {
            return {
                ok: false,
                mensaje: `no se encontro una orden con el ${ordenId}`
            }
        }
        return {
            ok: true
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            mensaje: 'No se pudo actualizar el id de la transaccion'
        }
    }
}