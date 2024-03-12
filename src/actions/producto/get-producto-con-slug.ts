'use server'

import prisma from '@/lib/prisma'

export const getProductoConSlug = async (slug: string) => {
    try {


        const producto = await prisma.producto.findFirst({
            include: {
                ImagenProducto: true
            },
            where: {
                slug: slug
            }
        })

        if( !producto) return null

        return {
            ...producto,
            imagenes: producto?.ImagenProducto?.map(imagen => imagen.url) || []
        }
    } catch (error) {
        console.log(error)
        throw new Error('Error al obtener un producto por slug')
    }
}