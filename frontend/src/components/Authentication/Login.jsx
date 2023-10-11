import React from "react";

const Login = () => {
  return (
    <form className="mt-6">
      <div>
        <label
          for="username"
          className="block text-sm text-gray-800 dark:text-gray-200"
        >
          Username
        </label>
        <input
          type="text"
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <label
            for="password"
            className="block text-sm text-gray-800 dark:text-gray-200"
          >
            Password
          </label>
          <a
            href="#"
            className="text-xs text-gray-600 dark:text-gray-400 hover:underline"
          >
            Forget Password?
          </a>
        </div>

        <input
          type="password"
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
      </div>

      <div className="mt-6">
        <button className="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
          Sign In
        </button>
      </div>
    </form>
  );
};

export default Login;
