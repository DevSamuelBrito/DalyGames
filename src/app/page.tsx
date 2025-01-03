import { Container } from "@/components/Container";

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

export default async function Home() {
  const dalyGame: GamesProps = await getDalyGame();

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
                className="max-h-96 object-cover rounded-lg opacity-50 hover:opacity-100 transition-all duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200) 44vw"
                fill={true}
              ></Image>
            </div>
          </section>
        </Link>
        <Input />
      </Container>
    </main>
  );
}
