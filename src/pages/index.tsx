export default function Home() {
  return (
    <main className="px-16">
      {/* div primera seccion */}
      <div>
        <div></div>
        <div></div>
        <div></div>
      </div>

      {/* div segunda sección */}

      <div className="relative w-60 h-[448px] text-gold-1 flex flex-col justify-center items-center gap-6 rounded-lg ">
        <img src="/cardbg.png " className="absolute z-[-1]" alt="" />
        <img src="/vectores.png" className="absolute top-28" alt="" />

        <div className="flex items-center">
          <img className="h-6" src="/vector1.png" alt="" />
          <p className="text-center mx-3">
            PERSONAJE <br /> NAME
          </p>
          <img className="h-6" src="/vector2.png" alt="" />
        </div>

        <img className="top-20 h-32  w-32" src="/mask-group.png" alt="" />

        <div className="flex flex-col gap-5">
          <div className="w-44 h-12 rounded-lg border-[0.75px] border-gris-3 bg-gris-4 flex items-center">
            <p className="ms-4 ">
              Comics: <span className="ms-4">25</span>
            </p>
          </div>
          <div className="w-44 h-12 rounded-lg border-[0.75px] border-gris-3 bg-gris-4 flex items-center">
            <p className="ms-4 ">
              Comics: <span className="ms-4">25</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
