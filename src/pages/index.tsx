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

  const characters = charactersData?.map((character) => {
    return (
      <CharacterCard
        key={character.id}
        img={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        name={character.name}
        comics={character.comics.available}
        movies={character.stories.available}
      />
    );
  });

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
      </main>
    </>
  );
}
