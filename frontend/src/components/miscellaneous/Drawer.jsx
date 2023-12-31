import React from "react";

export default function Drawer({ children, isOpen, setIsOpen }) {
 
  return (
    <main
      className={
        " fixed  z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
        (isOpen
          ? " transition-opacity opacity-100 duration-500 translate-x-0 "
          : " transition-all delay-500 opacity-0 -translate-x-full  ")
      }
    >
      <section
        className={
          " w-[400px] max-w-lg left-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (isOpen ? "-translate-x-0 " : " -translate-x-full ")
        }
      >
        <article className="relative  max-w-lg pb-10 flex flex-col space-y-6  h-full">
          <header className="p-4 font-bold text-3xl border rounded-lg shadow-md text-blue-400 flex m-2">Find Users</header>
          {children}
        </article>
      </section>
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsOpen(false);
        }}
      ></section>
    </main>
  );
}
