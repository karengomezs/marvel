export default function Nav() {
  return (
    <nav className="bg-dark-1 text-gold-1 h-[116px] flex px-16 border-b-1 border-gris-3">
      <img src="/logo.svg" alt="" />
      <ul className="flex ">
        <li className="w-[114px] flex items-center justify-center hover-nav group">
          <img
            className="absolute bottom-0 hidden group-hover:block"
            src="/vector.png"
            alt=""
          />
          <span className="group-hover:text-gold-2">HOME</span>
        </li>
        <li className="w-[114px] flex items-center justify-center hover-nav group relative">
          <img
            className="absolute bottom-0 hidden group-hover:block"
            src="/vector.png"
            alt=""
          />
          <span className="group-hover:text-gold-2">PERSONAL</span>
        </li>
      </ul>

      <div className="flex gap-8 text-2xl items-center ms-[55%]">
        <i className="fa-solid fa-bell text-gold-2"></i>
        <i className="fa-solid fa-gear text-white"></i>
      </div>
    </nav>
  );
}
