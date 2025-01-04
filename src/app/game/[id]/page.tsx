import { Container } from "@/components/Container";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Label } from "./components/label";
import { GamesProps } from "@/utils/types/game";
import { GameCard } from "@/components/GameCard";
import { Metadata } from 'next'

interface PropsParams {
  params: {
    id: string;
  }
}

export async function generateMetadata({ params }: PropsParams): Promise<Metadata> {
  try {
    const response:GamesProps = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${params.id}`, { next: { revalidate: 60 } })
      .then((res) => res.json())
      .catch(() => {
        return {
          title: "DalyGames - Descubra jogos incríveis para se divertir."
        }
      })

    return {
      title: response.title,
      description: `${response.description.slice(0, 100)}...`,
      openGraph: {
        title: response.title,
        images: [response.image_url]
      },
      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: true,
        }
      }
    }



  } catch (err) {
    return {
      title: "DalyGames - Descubra jogos incríveis para se divertir."
    }
  }
}


async function getGameSorted() {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game_day`,
      { cache: "no-cache" }
    );
    return res.json();
  } catch (error) {
    throw new Error("Erro ao buscar dados dos jogos");
  }
}

async function getData(id: number) {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`,
      { next: { revalidate: 60 } }
    );
    return res.json();
  } catch (error) {
    throw new Error("Erro ao buscar dados do jogo");
  }
}

export default async function Game({
  params: { id },
}: {
  params: { id: number };
}) {
  const data: GamesProps = await getData(id);
  if (!data) {
    redirect("/");
  }

  const dataSorted: GamesProps = await getGameSorted();
  return (
    <main className="w-full text-black">
      <div className="bg-black h-80 sm:h-96 w-full relative">
        <Image
          src={data.image_url}
          alt={data.title}
          fill={true}
          priority={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200) 44vw"
          className="object-cover w-full h-80 sm:h-96 opacity-80"
        />
      </div>
      <Container>
        <h1 className="font-bold text-xl my-4">{data.title}</h1>
        <p>{data.description}</p>

        <h2 className="font-bold text-lg mt-7 mb-2">Plataformas</h2>
        <div className="flex gap-2 flex-wrap">
          {data.platforms.map((item) => (
            <Label key={item} name={item} />
          ))}
        </div>
        <h2 className="font-bold text-lg mt-7 mb-2">Categorias</h2>
        <div className="flex gap-2 flex-wrap">
          {data.categories.map((item) => (
            <Label key={item} name={item} />
          ))}
        </div>

        <p className=" mt-7 mb-2">
          <strong>Data de lançamento:</strong>
          {data.release}
        </p>
        <h2 className="font-bold text-lg mt-7 mb-2">Jogos recomendados: </h2>
        <div className="flex">
          <div className="flex-grow">
            <GameCard data={dataSorted} />
          </div>
        </div>
      </Container>
    </main>
  );
}
