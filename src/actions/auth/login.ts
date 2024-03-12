'use server'


import { signIn } from '@/auth.config';
import { sleep } from '@/utils';
 
// ...
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {

    // await sleep(2);
    
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false, // Creo un nuevo objeto pero con la opcion de redirect 
    });

    return 'Success';


  } catch (error) {
    console.log(error);

    return 'CredentialsSignin'


  }
}


export const login = async(email:string, password: string) => {

  try {

    await signIn('credentials',{ email, password, redirect: false })

    return {ok: true};
    
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo iniciar sesión'
    }
    
  }


}

