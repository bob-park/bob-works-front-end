import axios from 'axios';

const client = axios.create({
  withCredentials: true,
});

export default function Login() {
  const loginHandle = () => {
    location.href = 'http://127.0.0.1:8083/login';
  };

  return (
    <>
      <button
        type="button"
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => loginHandle()}
      >
        Sign In
      </button>
    </>
  );
}
