import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { Avatar, Label } from 'flowbite-react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="h-screen">
      <Head>
        <title>Bob Works</title>
      </Head>
      <div className="grid grid-flow-row grid-rows-1 grid-cols-3 h-full p-10">
        <div className="col-span-1">
          <div className="grid grid-cols-1">
            {/* Avatar */}
            <div className="grid justify-start">
              <div className="mt-10 ">
                <Avatar rounded size="md"></Avatar>
              </div>
              <div className="mt-10">name</div>
              <div className="mt-1">sub name</div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}
