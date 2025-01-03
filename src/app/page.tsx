import { Container } from "@/components/Container";

import Link from "next/link";
import Image from "next/image";
import { GamesProps } from "@/utils/types/game";

async function getDalyGame() {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URl}/next-api/?api=game_day`
    );
    return res.json();
  } catch (error) {
    throw new Error("Erro ao buscar os dados");
  }
}

export default async function Home() {
  const dalyGame: GamesProps = await getDalyGame();

  return (
    <main className="flex">
      <Container>
        <h1 className="text-center font-bold text-xl mt-8 mb-5">
          Separamos um Jogo Exclusivo para Você
        </h1>

        <Link href={`/games/${dalyGame.id}`}>
          <section className="w-full bg-black rounded-lg">
            <Image
              src={dalyGame.image_url}
              priority={true}
              quality={100}
              width={100}
              height={100}
              alt={dalyGame.title}
            ></Image>
          </section>
        </Link>
      </Container>
    </main>
  );
}
