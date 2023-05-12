import CharacterCard from "@/components/character";
import { getCharacters, RootObject } from "@/api/characters";

export const getServerSideProps = async () => {
  const response = await getCharacters();

  return { props: { response } };
};

type PropsT = { response: RootObject };

export default function Home(props: PropsT) {
  console.log(props.response);

  const characters = props.response.data.results.map((character) => {
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
      <div className="flex flex-wrap gap-5">{characters}</div>
    </main>
  );
}
