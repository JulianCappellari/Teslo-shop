'use server'
import prisma from '@/lib/prisma'

export const eliminarUsuarioDireccion = async (usuarioId :string) => {
    try {
        const eliminar = await prisma.direccionUsuario.delete({
            where: {
                usuarioId: usuarioId
            }
        })

        console.log('direccion eliminada')
        return {
            ok: true
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            mensaje: 'No se pudo eliminar la direccion'
        }
    }
}