// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import axios from 'axios';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  // TODO
  // 1. 코드를 발급 받기 (redirect -> access token)
  // 2. 발급 받은 코드로 access token 발급받기 (redirect -> home page)
}
