'use server'
import prisma from '@/lib/prisma'

export const getCategorias = async () => {
    try {
        const categorias = await prisma.categoria.findMany({
            orderBy: {
                nombre: 'asc'
            }
        })

        return categorias
    } catch (error) {
        console.log(error)
        return [ ]
    }
}