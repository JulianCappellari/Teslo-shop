'use server'

import prisma from '@/lib/prisma'


export const  getPaises = async() => {

    try {
        const paises = await prisma.pais.findMany({
            orderBy: {
                nombre: 'asc'
            }
        })
        return paises
    } catch (error) {
        return[]
    }
}