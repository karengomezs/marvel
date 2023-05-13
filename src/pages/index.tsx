import { useState } from "react";
import CharacterCard from "@/components/character";
import { getCharacters, RootObject, Result } from "@/api/characters";
import Nav from "@/components/nav";
import Anounces from "@/components/containerAnounce";

export const getServerSideProps = async () => {
  const urlBase =
    "http://gateway.marvel.com/v1/public/characters?apikey=7e68f217f38c3e340c4abaa74c28ba0a&hash=16d0e344d494e4430bdefb30fd94e12c&ts=1&limit=12&offset=0";

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

export default function Home(props: PropsT) {
  const [charactersData, setCharactersData] = useState<Result[] | undefined>(
    props.response?.data.results
  );

  const [offSet, setOffSet] = useState(props?.response?.data.offset || 0);

  const [counterPage, setCounterPage] = useState<number>(1);

  const [modal, setModal] = useState<boolean>(false);

  const [clickedCharacter, setClickedCharacter] = useState<
    Result | undefined
  >();

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

  console.log({ clickedCharacter });

  return (
    <>
      <Nav />
      <main className="px-16 pt-20 pb-16 relative">
        <img
          className="z-[-1] absolute top-0 left-0 h-full object-cover"
          src="/fondo.png"
          alt=""
        />
        {/* -------------------------------------------- */}

        <Anounces />

        {/* ---------------------- */}
        <div className="grid cards gap-4 mt-20">{characters}</div>

        {/* ---------------------- */}
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

        {/* ------------------------------------------------------------------------------------------------ */}

        <dialog
          open={modal}
          className="w-[40%] p-4 rounded-lg border-2 border-gold-2"
        >
          <i
            onClick={() => {
              setModal(false);
            }}
            className="fa-solid fa-x"
          ></i>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <img
                className="w-40 h-40 rounded-full object-cover"
                src={`${clickedCharacter?.thumbnail.path}.${clickedCharacter?.thumbnail.extension}`}
                alt=""
              />

              <div className="">
                <p className="text-xl">{clickedCharacter?.name}</p>
                <p className="text-justify mt-2">
                  {clickedCharacter?.description}
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <p>
                <span className="text-gold-2"> Comics: </span>
                {clickedCharacter?.comics.available}
              </p>
              <p>
                <span className="text-gold-2"> Events: </span>
                {clickedCharacter?.events.available}
              </p>
              <p>
                <span className="text-gold-2"> Series: </span>
                {clickedCharacter?.series.available}
              </p>
            </div>
          </div>
        </dialog>
      </main>
    </>
  );
}
