export default function Nav() {
  return (
    <nav className="bg-dark-1 text-gold-1 h-[116px] flex px-16 border-b-1 border-gris-3">
      <img src="/logo.svg" alt="" />
      <ul className="flex ">
        <li className="w-[114px] flex items-center justify-center hover-nav group">
          <span className="group-hover:text-gold-3">HOME</span>
        </li>
        <li className="w-[114px] flex items-center justify-center hover-nav group">
          <span className="group-hover:text-gold-3 ">PERSONAL</span>
        </li>
      </ul>
    </nav>
  );
}
