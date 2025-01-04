import { Container } from '@/components/Container';
import { Input } from '@/components/Input';
import { GamesProps } from '@/utils/types/game';
import { GameCard } from '@/components/GameCard';

async function getGameData(title: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&title=${title}`
    );
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function Search({
  params: { title },
}: {
  params: { title: string };
}) {
  const data: GamesProps = await getGameData(title);

  return (
    <Container>
      <Input />

      <h1 className="text-xl text-bold mt-8 mb-5">
        Veja o que encontramos na nossa base...
      </h1>

      {!data && <p>Esse jogo não foi encontrado!...</p>}

      <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data &&
          data.map((item) => <GameCard key={item.id} data={item}></GameCard>)}
      </section>
    </Container>
  );
}
