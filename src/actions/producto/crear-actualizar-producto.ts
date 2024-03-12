'use server'

import { Genero, Producto, Talle } from '@prisma/client' // Importa los tipos y modelos de datos desde prisma
import {z} from 'zod' // Importa la librería Zod para la validación de esquemas
import prisma from '@/lib/prisma' // Importa la instancia de Prisma para interactuar con la base de datos
import { revalidatePath } from 'next/cache'
import {v2 as cloudinary} from 'cloudinary';
cloudinary.config(process.env.CLOUDINARY_URL ?? '')

// Esquema de validación utilizando Zod
const ProductoSchema = z.object({
    id: z.string().uuid().optional().nullable(), // Define un esquema para el id del producto
    titulo: z.string().min(3).max(255), // Define un esquema para el título del producto
    slug: z.string().min(3).max(255), // Define un esquema para el slug del producto
    descripcion: z.string(), // Define un esquema para la descripción del producto
    precio: z.coerce.number().min(0).transform( val => Number(val.toFixed(2))), // Define un esquema para el precio del producto
    enStock: z.coerce.number().min(0).transform( val => Number(val.toFixed(0))), // Define un esquema para la cantidad en stock del producto
    categoriaId: z.string().uuid(), // Define un esquema para el id de la categoría del producto
    talles: z.coerce.string().transform(val => val.split(',')), // Define un esquema para los talles del producto
    etiquetas: z.string(), // Define un esquema para las etiquetas del producto
    genero: z.nativeEnum(Genero), // Define un esquema para el género del producto
})

// Función asíncrona para crear o actualizar un producto
export const crearActualizarProducto = async(formData: FormData) => {

    // Convierte los datos del formulario en un objeto
    const data = Object.fromEntries(formData)

    // Valida los datos del producto con el esquema definido
    const productoAprobado = ProductoSchema.safeParse(data)

    // Si la validación falla, se imprime el error y se retorna {ok: false}
    if(!productoAprobado.success){
        console.log(productoAprobado.error);
        return {ok:false}
        
    }

    // Se extraen los datos del producto y se formatea el slug
    const producto = productoAprobado.data
    producto.slug = producto.slug.toLowerCase().replace( / /g, '-').trim()

    // Se extrae el id del producto y se crea un objeto con el resto de la información
    const {id, ...restInfo} = producto // excluyo el id porque puede ser nulo

    try {
        
        // Se ejecuta una transacción Prisma para crear o actualizar el producto
        const transaccionPrisma = await prisma.$transaction(async (transaccion) => {
            let producto: Producto
    
            // Se dividen las etiquetas y se formatean
            const etiquetasArray = restInfo.etiquetas.split(',').map( etiqueta => etiqueta.trim().toLowerCase() )
    
            if(id){
                // Si el id existe, se actualiza el producto
                producto = await prisma.producto.update({
                    where: {id},
                    data: {
                        ...restInfo,
                        talles : {
                            set: restInfo.talles as Talle[]
                        },
                        etiquetas: {
                            set: etiquetasArray
                        }
                    }
                })
                
            }else {
                // Si el id no existe, se crea un nuevo producto
                producto = await prisma.producto.create({
                    data: {
                        ...restInfo,
                        talles: {
                            set: restInfo.talles as Talle[]
                        },
                        etiquetas: {
                            set: etiquetasArray
                        }
                    }
                })
            }
    
            // console.log({producto}) // Imprime el producto creado o actualizado

            // Proceso de carga y guardado de imagenes
            // Recorrer las imagenes y guardarlas 
            if(formData.getAll('imagenes')){
                // [https://url.jpg, https://url.jpg] 
                const imagenes = await cargarImagenes(formData.getAll('imagenes') as File[])

                if(!imagenes){
                    throw new Error('No se pudo cargar las imagenes, rollback')
                }

                await prisma.imagenProducto.createMany({
                    data: imagenes.map( imagen => ({
                        url: imagen!,
                        productoId: producto.id
                    }))
                })
            }

    
            return {
                producto
            }
        })

        //Recargar automaticamente las siguientes paginas 
        revalidatePath('/admin/productos')
        revalidatePath(`/admin/producto/${producto.slug}`)
        revalidatePath(`/productos/${producto.slug}`)

        return {
            ok: true,
            producto: transaccionPrisma.producto
        }
    } catch (error) {
        console.log(error)
        return {
            ok: false,
            mensaje: 'Revisar los logs, no se pudo actualizar/crear'
        }
    }


    // Retorna {ok: true} cuando se completa la transacción correctamente
    return {
        ok: true
    }
}


const cargarImagenes = async(imagenes: File[]) => {
    try {
        const cargarPromesas = imagenes.map( async(imagen) => {
            try {
                
                const buffer = await imagen.arrayBuffer()
                const  base64Imagen = Buffer.from(buffer).toString('base64') // Creo un string 
    
                return cloudinary.uploader.upload(`data:image/png;base64,${base64Imagen}`)
                    .then( respuesta => respuesta.secure_url)
            } catch (error) {
                console.log(error)
                return null
            }
        })

        const imagenesActualizadas = await Promise.all(cargarPromesas)
        return imagenesActualizadas
    } catch (error) {
        console.log(error)
        return null
    }
}