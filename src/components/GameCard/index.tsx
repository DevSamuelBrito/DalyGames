import { GamesProps } from "@/utils/types/game";
import Link from "next/link";
import Image from "next/image";
import { BsArrowRightCircle } from "react-icons/bs";

interface GameCardProps {
  data: GamesProps;
}

export function GameCard({ data }: GameCardProps) {
  return (
    <Link href={`/game/${data.id}`}>
      <section className="w-full bg-slate-200 rounded-lg p-4 mb-5">
        <div className="w-full relative h-56 hover:scale-105 transition-all duration-300">
          <Image
            src={data.image_url}
            priority={true}
            quality={100}
            alt={data.title}
            fill={true}
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200) 44vw"
          ></Image>
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm font-bold px-2 text-black text-ellipsis truncate whitespace-nowrap overflow-hidden">{data.title}</p>
          <BsArrowRightCircle size={24} color="#000" />
          </div>
      </section>
    </Link>
  );
}
