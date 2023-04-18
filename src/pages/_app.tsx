import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { Avatar, Label } from 'flowbite-react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="h-screen w-screen">
      <Head>
        <title>Bob Works</title>
      </Head>
      <div className="flex h-full p-10 w-full">
        <div className="flex-initial w-64 min-w-min md:min-w-0">
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
        <div className="flex-initial w-full">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}
