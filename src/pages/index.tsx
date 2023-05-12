import { useState } from "react";
import CharacterCard from "@/components/character";
import { getCharacters, RootObject, Result } from "@/api/characters";

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
    <main className="px-16">
      <div className="grid cards gap-4 mt-20">{characters}</div>

      {/* ---------------------- */}
      <div className="flex gap-4 justify-center">
        <button
          className="bg-gold-2 w-8 h-8 rounded-full"
          onClick={async () => {
            const response = await getCharacters(offSet - 10);
            setOffSet(response?.data.offset || 0);
            setCounterPage(counterPage - 1);
            setCharactersData(response?.data.results);
          }}
          disabled={offSet < 1}
        >{`<`}</button>
        <p>
          {counterPage} / {Math.ceil(props.response.data.total / 10)}
        </p>
        <button
          className="bg-gold-2 w-8 h-8 rounded-full"
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
