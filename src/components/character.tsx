import { useState } from "react";

interface Props {
  img: string;
  name: string;
  comics: number;
  movies: number;
  onclick: () => {} | void;
}

export default function CharacterCard({
  img,
  name,
  comics,
  movies,
  onclick,
}: Props) {
  return (
    <div className="relative w-fit cursor-pointer" onClick={onclick}>
      <img src="/cardbg.png " className="" alt="" />

      <div className="absolute z-1 w-full h-full p-8 flex flex-col items-center justify-between top-0">
        <div className="flex justify-center items-center text-gold-1 ">
          <img className="h-6" src="/vector1.png" alt="" />
          <p className="text-center mx-3">{name}</p>
          <img className="h-6" src="/vector2.png" alt="" />
        </div>

        <div className="animation-rotate relative w-44 flex justify-center">
          <img className="rotate" src="/diamonds.png" alt="" />
          <img
            src="/vectores.png"
            className="absolute top-2 w-44 h-44 rotate z-1"
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
              <span className="font-sans">Comics:</span>
              <span className="ms-4 text-2xl">{comics}</span>
            </p>
          </div>
          <div className="w-44 h-12 rounded-lg border-[0.75px] border-gris-3 bg-gris-4 flex items-center">
            <p className="ms-4 ">
              <span className="font-sans">Series:</span>
              <span className="ms-4 text-2xl"> {movies}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
