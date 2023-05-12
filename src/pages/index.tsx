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
      <div className="flex gap-5 text-gold-1 h-48">
        <div className="border-[0.75px] border-gold-2 flex-1 rounded-md">
          <p className="text-center mt-7 mb-3">
            PROGRESO DE PELÍCULAS PRODUCIDAS
          </p>
          <p className="font-regular text-xs text-gold-2 pe-[10%] text-right">
            Production Goals: <br /> 100 movies
          </p>
          <div className="border-2 border-gold-2 w-[80%] h-8 mx-auto p-1 m-2 skew">
            <div className="bg-gold-1 m-auto w-full h-full">
              <div className="progress-bar w-[60%] h-full"></div>
            </div>
          </div>
          <p className="font-regular text-xs blue-font pe-[43%] text-right">
            Produced Movies: <br /> 60 Movies
          </p>
        </div>
        <div className="border-[0.75px] border-gold-2 w-80 rounded-sm">
          <Youtube />
        </div>
        <div className="border-[0.75px] border-gold-2 w-80 rounded-sm">
          <img
            className="h-full object-cover"
            src="https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2018/12/infinity-war.jpg?fit=1000%2C563&quality=50&strip=all&ssl=1"
            alt=""
          />
        </div>
      </div>
      {/* ---------------------- */}
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
