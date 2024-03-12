"use server";

import { StatusOrdenPaypal } from "@/interfaces";
import prisma from '@/lib/prisma'
import { revalidatePath } from "next/cache";

export const paypalPagoChequeado = async (paypalTransaccionId: string) => {
  const authToken = await getPaypalBearrerToken();
  //   console.log({ authToken });

  if (!authToken) {
    return {
      ok: false,
      mensaje: "No se pudo obtener el token de validacion",
    };
  }

  const respuesta = await verificacionPAgoPayal(paypalTransaccionId, authToken);
  if (!respuesta) {
    return {
      ok: false,
      mensaje: "Error al verificar el pago",
    };
  }

  const { status, purchase_units } = respuesta;
    const {invoice_id: ordenId} = purchase_units[0]
  // console.log({status, purchase_units})

  if(status !== 'COMPLETED') {
    return {
        ok: false,
        mensaje: 'Aun no se ha pagado en Paypal'
    }
  }

  try {
    await prisma.orden.update({
        where: {id: ordenId},
        data: {
            estaPagada: true,
            pagadoEl: new Date()
        }
    })

    // Revalidar path
    revalidatePath(`/orden/${ordenId}`)

    return {
        ok: true
    }

  } catch (error) {
    console.log(error)
    return {
        ok: false,
        mensaje: 'El pago no se pudo realizar'
    }
  }
};

const getPaypalBearrerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const oaut2Url = process.env.PAYPAL_OAUTH_URL ?? "";

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const result = await fetch(oaut2Url, {
      ...requestOptions,
      cache: "no-store",
    }).then((r) => r.json());
    return result.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const verificacionPAgoPayal = async (
  paypalTransactionId: string,
  bearerToken: string
): Promise<StatusOrdenPaypal | null> => {
  const ordenPaypalUrl = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`;
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const response = await fetch(ordenPaypalUrl, {
        ...requestOptions,
        cache: 'no-store'
    }).then(
      (respuesta) => respuesta.json()
    );

    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
