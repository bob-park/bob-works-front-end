import axios from 'axios';
import { useEffect, useLayoutEffect } from 'react';

const client = axios.create({
  withCredentials: true,
});

export default function Login() {
  const handle = () => {
    location.href =
      'http://localhost:9000/oauth2/authorize?response_type=code&client_id=00938069-4d62-43be-b869-a70b2fc80399&scope=openid%20profile%20document%20email%20phone&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2Fapi%2Foauth2%2Fcode%2Fbob-works';
  };

  return (
    <>
      <button
        type="button"
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => handle()}
      >
        Sign In
      </button>
    </>
  );
}
