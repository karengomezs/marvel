import { useState } from "react";
import CharacterCard from "@/components/character";
import { getCharacters, RootObject, Result } from "@/api/characters";

export const getServerSideProps = async () => {
  const response = await getCharacters();

  return { props: { response } };
};

type PropsT = { response: RootObject };

export default function Home(props: PropsT) {
  console.log(props);

  const [charactersData, setCharactersData] = useState<Result[] | undefined>(
    props.response.data.results
  );
  const [offSet, setOffSet] = useState(props.response.data.offset);

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
      <div className="flex gap-4">
        <button
          className="bg-gold-2 w-8 h-8 rounded-full"
          onClick={async () => {
            const response = await getCharacters(offSet - 10);
            setOffSet(response?.data.offset || 0);
            setCharactersData(response?.data.results);
          }}
          disabled={offSet < 1}
        >{`<`}</button>

        <button
          className="bg-gold-2 w-8 h-8 rounded-full"
          onClick={async () => {
            const response = await getCharacters(offSet + 10);
            setOffSet(response?.data.offset || 0);
            setCharactersData(response?.data.results);
          }}
        >{`>`}</button>
      </div>

      <div className="flex flex-wrap gap-5">{characters}</div>
    </main>
  );
}
