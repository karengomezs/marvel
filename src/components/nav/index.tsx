import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Nav() {
  const [modal, setModal] = useState(false);
  const router = useRouter();

  return (
    <>
      <nav className="bg-dark-1 text-gold-1 h-[116px] flex md:px-16 border-b-1 border-gris-3">
        {/* <div className="flex flex-col"> */}
        <img src="/logo.svg" className="h-full" alt="" />

        <ul className="md:flex hidden">
          <li className="w-[114px] flex items-center justify-center group ">
            <img
              className="absolute bottom-0 hidden group-hover:block"
              src="/vector.png"
              alt=""
            />
            <span className="group-hover:text-gold-2">HOME</span>
          </li>

          <li
            className={`w-[114px] flex items-center justify-center  group ${
              router.pathname === "/" ? "hover-nav" : ""
            }`}
          >
            <img
              className="absolute bottom-0 hidden group-hover:block"
              src="/vector.png"
              alt=""
            />
            <span className="group-hover:text-gold-2">CHARACTERS</span>
          </li>
        </ul>
        {/* </div> */}

        <div className="md:flex gap-8 text-2xl items-center ms-auto hidden">
          <i className="fa-solid fa-bell text-white hover:text-gold-2"></i>
          <i className="fa-solid fa-gear text-white hover:text-gold-2"></i>
          <Link href="https://github.com/karengomezs/marvel" target="_blank">
            <i className="fa-brands fa-github hover:text-gold-2"></i>
          </Link>
          <Link href="https://karengomez.netlify.app/" target="_blank">
            <i className="fa-solid fa-user hover:text-gold-2"></i>
          </Link>
        </div>
        <div className="md:hidden my-auto ml-auto mr-8">
          <i className="fa-solid fa-bell text-white hover:text-gold-2"></i>
          <i
            onClick={() => {
              setModal(!modal);
            }}
            className="fa-solid fa-bars text-xl ml-4"
          ></i>
        </div>
      </nav>

      <dialog
        open={modal}
        className="z-10 w-full h-full fixed top-0 bottom-0 p-0 bg-gris-4 text-gold-2"
      >
        <div className="flex justify-between bg-orange-600 py-8 px-4 items-center text-white">
          <i
            onClick={() => {
              setModal(!modal);
            }}
            className="fa-solid fa-x text-xl"
          ></i>
          <p className="text-2xl">Menú</p>
        </div>
        <ul className="text-stone-600 mt-5 flex flex-col items-end mr-4 gap-5 text-xl">
          <li>
            <span>Home</span> <i className="fa-solid fa-house ml-2"></i>
          </li>
          <li>
            <span>Characters</span> <i className="fa-solid fa-users ml-2"></i>
          </li>

          <li>
            <span>Settings </span>
            <i className="fa-solid fa-gear text-white  ml-2"></i>
          </li>
          <li>
            <Link href="https://github.com/karengomezs/marvel" target="_blank">
              <span>Repo </span>

              <i className="fa-brands fa-github ml-2"></i>
            </Link>
          </li>
          <li>
            <Link href="https://karengomez.netlify.app/" target="_blank">
              <span>Portfolio </span>
              <i className="fa-solid fa-user  ml-2"></i>
            </Link>
          </li>
        </ul>
      </dialog>
    </>
  );
}
