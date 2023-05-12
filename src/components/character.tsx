interface Props {
  img: string;
  name: string;
  comics: number;
  movies: number;
}

export default function CharacterCard({ img, name, comics, movies }: Props) {
  return (
    <div className="relative w-fit ">
      <img src="/cardbg.png " className="" alt="" />

      <div className="absolute z-1 w-full h-full p-8 flex flex-col items-center justify-between top-0">
        <div className="flex justify-center items-center text-gold-1 ">
          <img className="h-6" src="/vector1.png" alt="" />
          <p className="text-center mx-3">{name}</p>
          <img className="h-6" src="/vector2.png" alt="" />
        </div>

        <div className="relative w-32 flex justify-center">
          <img className="" src="/diamonds.png" alt="" />
          <img
            src="/vectores.png"
            className="absolute top-8 scale-125  z-10"
            alt=""
          />
          <img
            src={img}
            className="absolute top-8 w-32 h-32 rounded-full object-cover"
            alt=""
          />
        </div>

        <div className="flex flex-col gap-5 text-gold-1">
          <div className="w-44 h-12 rounded-lg border-[0.75px] border-gris-3 bg-gris-4 flex items-center">
            <p className="ms-4 ">
              Comics: <span className="ms-4">{comics}</span>
            </p>
          </div>
          <div className="w-44 h-12 rounded-lg border-[0.75px] border-gris-3 bg-gris-4 flex items-center">
            <p className="ms-4 ">
              Movies: <span className="ms-4">{movies}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
