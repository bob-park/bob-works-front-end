import { useEffect, useState } from 'react';
import DefaultSideBar from '@/component/DefaultSideBar';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Footer } from 'flowbite-react';

import axios from 'axios';

const client = axios.create({
  withCredentials: true,
});

const { Copyright, LinkGroup, Link } = Footer;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    client
      .get('/api/user')
      .then((res) => {
        setIsLoggedIn(true);
        setUser({
          ...res.data,
        });
      })
      .catch((err) => router.push('/api/oauth2/authorization/bob-works'));
  }, []);

  if (!user) {
    return null;
  }

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
              <DefaultSideBar user={user} />
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
