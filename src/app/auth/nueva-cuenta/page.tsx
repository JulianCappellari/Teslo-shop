import { fontTitulo } from '@/config/fonts';
import FormularioDeRegistro from './ui/FormularioDeDregistro';

export default function NuevaCuenta() {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-25">

      <h1 className={ `${ fontTitulo.className } text-4xl mb-5` }>Nueva cuenta</h1>

      <FormularioDeRegistro />
    </div>
  );
}