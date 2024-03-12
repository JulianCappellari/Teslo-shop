'use server'
import prisma from '@/lib/prisma'


// Sirve para si estas en otra computadora, devolver los datos de la base de datos 
export const getUsuarioDireccion = async(usuarioId: string) => {
    try {
        const direccion = await prisma.direccionUsuario.findUnique({
            where: {
                usuarioId: usuarioId
            }
        })

        if(!direccion) return null

        const {paisId, direccion2,  ...rest} = direccion

        return {
            ...rest,
            paisId: paisId,
            direccion2: direccion2 ? direccion2 : '' // Me aseguro que siempre me va a llegar alguna informacion
        }
    } catch (error) {
        console.log(error)
    }
}