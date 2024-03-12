'use server'

import prisma from '@/lib/prisma'
import bcryptjs from 'bcryptjs';

export const registrar = async( email: string, nombre: string, password: string) => {
    try {
        const usuario = await prisma.usuario.create({
            data: {
                nombre: nombre,
                email: email.toLowerCase(),
                password: bcryptjs.hashSync(password)
            },
            select: {
                id: true,
                nombre: true,
                email: true
            }
        })

        return {
            ok: true,
            usuario: usuario,
            mensaje: 'Se pudo registrar con exito'
        }
    } catch (error) {
        console.log('EL error esta en registrar ' + error)
        return {
            ok: false,
            mensaje: 'No se pudo crear el usuario'
        }
    }
}