import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@libs/server/withHandler";
import client from "@libs/client/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  const payload = phone ? { phone: +phone } : { email };

  const token = await client.token.create({
    data: {
      payload: "1234",
      user: {
        connectOrCreate: {
          // connectOrCreate : 유저를 찾지 못했을 때 생성해줌
          // user 테이블의 phone or email을 key로 설정, create
          where: {
            ...payload,
          },
          create: {
            name: "Anonymous",
            ...payload,
          },
        },
      },
    },
  });
  console.log(token);

  res.status(200).end();
}

export default withHandler("POST", handler);
