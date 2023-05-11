import { useLayoutEffect } from 'react';
import { useRouter } from 'next/router';

import LoginLoading from '@/components/loading/LoginLoading';

export default function Login() {
  const router = useRouter();

  useLayoutEffect(() => {
    router.push('/api/oauth2/authorization/bob-works');
  }, []);

  return (
    <div className="">
      <LoginLoading />
    </div>
  );
}
