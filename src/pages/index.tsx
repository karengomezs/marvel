import CharacterCard from "@/components/character";

export default function Home() {
  return (
    <main className="px-16">
      <div className="flex flex-wrap gap-5">
        <CharacterCard />
        <CharacterCard />
        <CharacterCard />
        <CharacterCard />
        <CharacterCard />
      </div>
    </main>
  );
}
