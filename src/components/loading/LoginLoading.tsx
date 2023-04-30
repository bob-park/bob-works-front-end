import { Spinner } from 'flowbite-react';

export default function LoginLoading() {
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="animate-pulse">
        <Spinner size="xl" />
        <span className="pl-3">Logging In...</span>
      </div>
    </div>
  );
}
