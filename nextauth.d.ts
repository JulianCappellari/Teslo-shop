
import NextAuth, {DefaultSession} from ' next-auth'
import Image from 'next/image';
 
declare module 'next-auth' {
    interface Session {
        user: {
            id: string,
            nombre: string,
            email: string,
            emailVerificado?: boolean,
            rol: string,
            Image?: string
        } & DefaultSession['user']
    }
}