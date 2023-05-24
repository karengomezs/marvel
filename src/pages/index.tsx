import { useState, useEffect, useRef, RefObject } from "react";
import Link from "next/link";
import CharacterCard from "@/components/character";
import { getCharacters, RootObject, Result } from "@/api/characters";
import Nav from "@/components/nav";
import Anounces from "@/components/containerAnounce";

export const getServerSideProps = async () => {
  const limit = 12;
  const offset = 0;

  const urlBase = `${process.env.API}/characters?apikey=${process.env.API_KEY}&hash=${process.env.HASH}&ts=${process.env.TS}&limit=${limit}&offset=${offset}`;

  let data;
  try {
    const response = await fetch(urlBase);

    data = await response.json();
  } catch (error) {
    console.error(error);
  }
  return { props: { response: data } };
};

type PropsT = { response: RootObject | undefined };

function useOutsideAlerter(
  ref: RefObject<HTMLDialogElement>,
  callback: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default function Home(props: PropsT) {
  const wrapperRef = useRef<HTMLDialogElement>(null);

  const [charactersData, setCharactersData] = useState<Result[] | undefined>(
    props.response?.data.results
  );

  const [offSet, setOffSet] = useState(props?.response?.data.offset || 0);

  const [counterPage, setCounterPage] = useState<number>(1);

  const [modal, setModal] = useState<boolean>(false);

  const [clickedCharacter, setClickedCharacter] = useState<
    Result | undefined
  >();

  useOutsideAlerter(wrapperRef, () => {
    setModal(false);
  });

  const characters = charactersData?.map((character) => {
    return (
      <CharacterCard
        key={character.id}
        img={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        name={character.name}
        comics={character.comics.available}
        movies={character.series.available}
        onclick={() => {
          setModal(true);
          setClickedCharacter(character);
        }}
      />
    );
  });

  return (
    <>
      <Nav />
      <main className="px-4 md:px-16 lg:pt-20 md:py-10 relative">
        <img
          className="z-[-1] absolute top-0 left-0 h-full object-cover"
          src="/fondo.png"
          alt=""
        />

        <Anounces />

        <div className="grid cards gap-4 mt-10 md:mt-20 justify-items-center">
          {characters}
        </div>

        <div className="flex gap-4 justify-center items-center mt-10">
          <button
            className="bg-gold-2 w-8 h-8 rounded-full flex justify-center items-center font-bold"
            onClick={async () => {
              const response = await getCharacters(offSet - 12);
              setOffSet(response?.data.offset || 0);
              setCounterPage(counterPage - 1);
              setCharactersData(response?.data.results);
            }}
            disabled={offSet < 1}
          >{`<`}</button>
          <p className="text-gold-2 font-bold">
            {counterPage} / {Math.ceil((props.response?.data.total || 1) / 12)}
          </p>
          <button
            className="bg-gold-2 w-8 h-8 rounded-full flex justify-center items-center font-bold"
            onClick={async () => {
              const response = await getCharacters(offSet + 12);
              setOffSet(response?.data.offset || 0);
              setCounterPage(counterPage + 1);
              setCharactersData(response?.data.results);
            }}
          >{`>`}</button>
        </div>
      </main>

      <dialog
        ref={wrapperRef}
        open={modal}
        className="w-[40%] p-6 rounded-lg border-[0.75px] border-gold-2 fixed bottom-[30%] bg-gris-4"
      >
        <div className="text-right">
          <i
            onClick={() => {
              setModal(false);
            }}
            className="fa-solid fa-circle-xmark text-gold-2 text-2xl"
          ></i>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex gap-5">
            <img
              className="w-40 h-40 rounded-full object-cover"
              src={`${clickedCharacter?.thumbnail.path}.${clickedCharacter?.thumbnail.extension}`}
              alt=""
            />

            <div className="">
              <p className="text-xl text-gold-2">{clickedCharacter?.name}</p>
              <p className="text-justify mt-2 font-sans text-gold-1">
                {clickedCharacter?.description || "Not available description"}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <p>
              <span className="text-gold-2"> Comics: </span>
              <span className="text-gold-1">
                {clickedCharacter?.comics.available}
              </span>
            </p>
            <p>
              <span className="text-gold-2"> Events: </span>
              <span className="text-gold-1">
                {clickedCharacter?.events.available}
              </span>
            </p>
            <p>
              <span className="text-gold-2"> Series: </span>
              <span className="text-gold-1">
                {clickedCharacter?.series.available}
              </span>
            </p>
            <link rel="stylesheet" href="" />

            {clickedCharacter?.urls.map((url) => {
              return (
                <Link
                  className="text-gold-2 underline text-base capitalize"
                  key={url.url}
                  rel="stylesheet"
                  href={url.url}
                >
                  {url.type}
                  <i className="fa-solid fa-arrow-up-right-from-square ms-1 text-sm"></i>
                </Link>
              );
            })}
          </div>
        </div>
      </dialog>
    </>
  );
}
