import Sidebar from '@/component/SideBar';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { Footer } from 'flowbite-react';

const { Copyright, LinkGroup, Link } = Footer;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="h-screen w-screen">
      <Head>
        <title>Bob Works</title>
      </Head>
      <div className="flex p-10 w-full">
        {/* TODO 나중에 이거 꼭 반응형으로 바꾸잣 */}
        <div className="flex-initial w-1/3 max-w-[300px] min-w-[300px] border-r-2 border-solid">
          <div className="grid grid-cols-1">
            <Sidebar />
          </div>
        </div>

        <div className="flex-initial w-full p-20">
          <Component {...pageProps} />
        </div>
      </div>

      <Footer container={true}>
        <Copyright href="#" by="by Bob park" year={new Date().getFullYear()} />
        <LinkGroup>
          <Link href="#">About</Link>
          <Link href="#">Privacy Policy</Link>
          <Link href="#">Licensing</Link>
          <Link href="#">Contact</Link>
        </LinkGroup>
      </Footer>
    </div>
  );
}
