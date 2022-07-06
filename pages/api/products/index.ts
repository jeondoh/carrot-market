import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { IResponseType } from "@libs/server/withHandler";
import client from "@libs/client/client";
import { withAPISession } from "@libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponseType>
) {
  const {
    body: { name, price, description },
    session: { user },
  } = req;
  const product = await client.product.create({
    data: {
      name,
      price: +price,
      description,
      image: "xx",
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });
  res.json({
    ok: true,
    product,
  });
}

export default withAPISession(
  withHandler({
    method: "POST",
    fn: handler,
  })
);
