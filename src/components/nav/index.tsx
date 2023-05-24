import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Nav() {
  const [modal, setModal] = useState(false);
  const router = useRouter();

  return (
    <>
      <nav className="bg-dark-1 text-gold-1 h-[116px] flex flex-col sm:flex-row px-16 border-b-1 border-gris-3">
        {/* <div className="flex flex-col"> */}
        <img src="/logo.svg" className="" alt="" />

        <ul className="flex ">
          <li className="w-[114px] flex items-center justify-center group">
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

        <div className="flex gap-8 text-2xl items-center ms-auto">
          <i className="fa-solid fa-bell text-white hover:text-gold-2"></i>
          <i className="fa-solid fa-gear text-white hover:text-gold-2"></i>
          <Link href="https://github.com/karengomezs/marvel" target="_blank">
            <i className="fa-brands fa-github hover:text-gold-2"></i>
          </Link>
          <Link href="https://karengomez.netlify.app/" target="_blank">
            <i className="fa-solid fa-user hover:text-gold-2"></i>
          </Link>
          <i
            onClick={() => {
              setModal(!modal);
            }}
            className="fa-solid fa-bars sm:hidden text-2xl text-orange-600"
          ></i>
        </div>
      </nav>

      <dialog open={modal} className="w-full h-full fixed top-0 bottom-0 p-0">
        <div className="flex justify-between bg-orange-600 py-8 px-4 items-center text-white">
          <i
            onClick={() => {
              setModal(!modal);
            }}
            className="fa-solid fa-x"
          ></i>
          <p className="text-3xl">Menú</p>
        </div>
        <ul className="text-stone-600 mt-5 flex flex-col gap-5 ml-4 text-xl">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>Nosotros</li>
          <li>Videos</li>
        </ul>
      </dialog>
    </>
  );
}
