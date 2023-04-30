import { Button } from 'flowbite-react';

import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/api/oauth2/authorization/bob-works');
  };

  return (
    <div className="flex w-1/2 justify-center items-center">
      <Button className="w-64" onClick={handleLogin}>
        로그인
      </Button>
    </div>
  );
}
