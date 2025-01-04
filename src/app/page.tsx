import { Container } from "@/components/Container";
import  {GameCard} from "@/components/GameCard";
import Link from "next/link";
import Image from "next/image";
import { GamesProps } from "@/utils/types/game";
import { BsArrowRightCircle } from "react-icons/bs";
import { Input } from "@/components/Input";

async function getDalyGame() {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URl}/next-api/?api=game_day`,
      { next: { revalidate: 320 } }
    );
    return res.json();
  } catch (error) {
    throw new Error("Erro ao buscar os dados");
  }
}

async function getDalyGameData() {
  try {
    const res = await fetch(`${process.env.NEXT_API_URl}/next-api/?api=games`, {
      next: { revalidate: 320 },
    });
    return res.json();
  } catch (error) {
    throw new Error("Erro ao buscar os dados");
  }
}

export default async function Home() {
  const dalyGame: GamesProps = await getDalyGame();
  const data: GamesProps[] = await getDalyGameData();

  return (
    <main className="w-full">
      <Container>
        <h1 className="text-center font-bold text-xl mt-8 mb-5">
          Separamos um Jogo Exclusivo para Você
        </h1>

        <Link href={`/games/${dalyGame.id}`}>
          <section className="w-full bg-black rounded-lg">
            <div className="w-full max-h-96 h-96 relative rounded-lg">
              <div className="flex justify-center items-center bottom-0 p-3 absolute z-20 gap-2 ">
                <p className="font-bold text-white text-xl">{dalyGame.title}</p>
                <BsArrowRightCircle size={24} color="#FFF" />
              </div>
              <Image
                src={dalyGame.image_url}
                priority={true}
                quality={100}
                alt={dalyGame.title}
                className="max-h-96 object-cover rounded-lg opacity-70 hover:opacity-100 transition-all duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200) 44vw"
                fill={true}
              ></Image>
            </div>
          </section>
        </Link>
        <Input />

        <h2 className="text-lg font-bold mt-8 mb-5">Jogos para conhecer</h2>
        <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map((item) => (
            <GameCard key={item.id} data={item}></GameCard>
          ))}
        </section>
      </Container>
    </main>
  );
}
