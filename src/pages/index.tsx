import { useState } from "react";
import CharacterCard from "@/components/character";
import { getCharacters, RootObject, Result } from "@/api/characters";
import Youtube from "@/components/youtube";

export const getServerSideProps = async () => {
  const response = await getCharacters();

  return { props: { response } };
};

type PropsT = { response: RootObject };

export default function Home(props: PropsT) {
  const [charactersData, setCharactersData] = useState<Result[] | undefined>(
    props.response.data.results
  );
  const [offSet, setOffSet] = useState(props.response.data.offset);
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
    <main className="px-16 pt-20 pb-16 bg-gris-4">
      <Youtube />
      <div className="flex gap-5 text-gold-1 h-48">
        <div className="border-[0.75px] border-gold-2 flex-1">
          <p className="text-center">PROGRESO DE PELÍCULAS PRODUCIDAS</p>
        </div>
        <div className="border-[0.75px] border-gold-2 w-80">
          <p>AQUI VIDEO YOUTUBE</p>
        </div>
        <div className="border-[0.75px] border-gold-2 w-80">
          <img
            className="h-full object-cover"
            src="https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2018/12/infinity-war.jpg?fit=1000%2C563&quality=50&strip=all&ssl=1"
            alt=""
          />
        </div>
      </div>
      <div className="grid cards gap-4 mt-20">{characters}</div>

      {/* ---------------------- */}
      <div className="flex gap-4 justify-center items-center mt-10">
        <button
          className="bg-gold-2 w-8 h-8 rounded-full flex justify-center items-center font-bold"
          onClick={async () => {
            const response = await getCharacters(offSet - 10);
            setOffSet(response?.data.offset || 0);
            setCounterPage(counterPage - 1);
            setCharactersData(response?.data.results);
          }}
          disabled={offSet < 1}
        >{`<`}</button>
        <p className="text-gold-2 font-bold">
          {counterPage} / {Math.ceil(props.response.data.total / 10)}
        </p>
        <button
          className="bg-gold-2 w-8 h-8 rounded-full flex justify-center items-center font-bold"
          onClick={async () => {
            const response = await getCharacters(offSet + 10);
            setOffSet(response?.data.offset || 0);
            setCounterPage(counterPage + 1);
            setCharactersData(response?.data.results);
          }}
        >{`>`}</button>
      </div>
    </main>
  );
}
