import DefaultSideBar from '@/component/DefaultSideBar';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { Footer } from 'flowbite-react';

const { Copyright, LinkGroup, Link } = Footer;

const dummyUser = {
  username: 'Bob Park',
  department: '디지털 미디어부',
  position: '대리',
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Bob Works</title>
      </Head>
      <div className="h-screen w-screen">
        <div className="flex p-10 w-full h-full">
          {/* TODO 나중에 이거 꼭 반응형으로 바꾸잣 */}
          <div className="flex-initial min-w-[300px] border-r-2 border-solid">
            <div className="h-full">
              <DefaultSideBar user={dummyUser} />
            </div>
          </div>

          <div className="grid w-full p-20 justify-center">
            <div className="min-w-[1000px] justify-center">
              <Component {...pageProps} />
            </div>
          </div>
        </div>

        <div className="relative">
          <Footer container={true} className="absolute bottom-0 ">
            <Copyright
              href="#"
              by="by Bob park"
              year={new Date().getFullYear()}
            />
            <LinkGroup>
              <Link href="#">About</Link>
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Licensing</Link>
              <Link href="#">Contact</Link>
            </LinkGroup>
          </Footer>
        </div>
      </div>
    </>
  );
}
