import { Titulo } from '@/components';
import FormularioDeDireccion from './ui/FormularioDeDireccion';
import { getPaises, getUsuarioDireccion } from '@/actions';
import { auth } from '@/auth.config';


export default async function NamePage() {

  // peticion http, pero las peticiones con la base de datos, van en actions

  const paises = await getPaises()

  const session = await auth()

  if(!session?.user){
    return (
      <h3 className='text-5xl'>No hay session de usuario</h3>
    )
  }

  const usuarioDireccion = await getUsuarioDireccion(session.user.id) ?? undefined

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">



      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">
        
        <Titulo titulo="Dirección" subtitulo="Dirección de entrega" />

        <FormularioDeDireccion paises={paises} usuarioStoreDireccion={usuarioDireccion}/>

      </div>




    </div>
  );
}