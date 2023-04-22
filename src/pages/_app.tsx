import '@/styles/globals.css';

import { useEffect } from 'react';

import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Footer } from 'flowbite-react';

import { wrapper } from '@/store/store';
import { authenticationActions } from '@/store/authentication';
import DefaultSideBar from '@/components/DefaultSideBar';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import LoginLoading from '@/components/loading/LoginLoading';

const { Copyright, LinkGroup, Link } = Footer;

const { requestGetUser } = authenticationActions;

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const { user } = useAppSelector((state) => state.authentication);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      requestGetUser({
        exceptionHandle: () =>
          router.push('/api/oauth2/authorization/bob-works'),
      }),
    );
  }, []);

  if (!user) {
    return <LoginLoading />;
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

export default wrapper.withRedux(App);
