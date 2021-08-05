const Login = () => (
  <div className="min-h-screen bg-dark flex justify-center items-center">
    <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
      <div>
        <h1 className="text-3xl font-bold text-center mb-4 cursor-pointer">
          LOGIN
        </h1>
        <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
          Enter your details to continue 😉
        </p>
      </div>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Email Addres"
          className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
        />
        <input
          type="text"
          placeholder="Password"
          className="block text-sm py-3 px-4 rounded-lg w-full border outline-none"
        />
      </div>
      <div className="text-center mt-6">
        <button className="py-2 w-56 text-xl text-white bg-dark rounded-lg">
          Login
        </button>
        <p className="mt-4 text-sm">
          Don&apos;t have an account?{' '}
          <span className="underline hover:cursor-pointer"> Sign up</span>
        </p>
      </div>
    </div>
  </div>
);

export default Login;
