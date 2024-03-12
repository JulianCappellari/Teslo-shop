"use server";

import prisma from "@/lib/prisma";
import { sleep } from "@/utils";

export const getStockConSlug = async (slug: string): Promise<number> => {
  try {
    // await sleep(3)
    const stock = await prisma.producto.findFirst({
      where: {
        slug,
      },
      select: { enStock: true },
    });

    return stock?.enStock ?? 0
  } catch (error) {
    return 0;
  }
};
