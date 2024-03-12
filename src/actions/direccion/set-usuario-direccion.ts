'use server'

import { Direccion } from "@/interfaces"
import prisma  from "@/lib/prisma"



export const setUsuarioDireccion = async(direccion: Direccion, usuarioId: string) => {
    try {

        const nuevaDireccion = await crearOReemplazarDireccion( direccion, usuarioId)

        return {
            ok: true,
            mensaje: 'Se pudo grabar la direccion del usuario',
            direccion: nuevaDireccion
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            mensaje: 'No se pudo guardar la direccion del usuario en la base de datos'
        }
    }
}


const crearOReemplazarDireccion = async( direccion: Direccion, usuarioId: string ) => {

    try {
        const storeDireccion = await prisma.direccionUsuario.findUnique({
            where: {
                usuarioId: usuarioId
            }
        })


        const direccionAGrabar = {
            usuarioId: usuarioId,
            direccion: direccion.direccion,
            direccion2 : direccion.direccion2,
            ciudad: direccion.ciudad,
            paisId: direccion.pais,
            nombre: direccion.nombre,
            apellido: direccion.apellido,
            codigoPostal: direccion.codigoPostal,
            telefono: direccion.telefono,
        }

        // Insercion nueva a la base de datos
        if(!storeDireccion){
            const nuevaDireccion = await prisma.direccionUsuario.create({
                data: direccionAGrabar
            })

            return nuevaDireccion
        }

        // Actualizar 
        const actualizarDireccion = await  prisma.direccionUsuario.update({
            where: {usuarioId},
            data: direccionAGrabar
        })

        return actualizarDireccion
    } catch (error) {
        console.log(error)
        throw new Error ('No se pudo grabar la direccion')
    }
}