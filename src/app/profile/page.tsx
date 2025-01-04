import { Container } from "@/components/Container";
import userImg from "../../../public/user.png";
import { FaShareAlt } from "react-icons/fa";
import Image from "next/image";

export default function Profile() {
  return (
    <main className="w-full text-black">
      <Container>
        <section className="mt-8 mb-6 flex flex-col items-center justify-between relative gap-3 sm:flex-row ">
          <div className="w-full flex items-center gap-4 text-lg flex-col sm:flex-row justify-center sm:justify-normal">
            <Image
              src={userImg}
              className="rounded-full h-56 w-56 object-cover"
              alt="Imagem do Usuário"
            />
            <h1 className="font-bold text-2xl">Samuel Fava de Brito</h1>
          </div>
          <div className="sm:absolute top-0 right-0 gap-3 flex items-center justify-center mt-2">
            <button className="bg-gray-700 rounded-xl px-4 py-3 text-white">
              Configurações
            </button>
            <button className="bg-gray-700 rounded-xl px-4 py-3">
              <FaShareAlt size={24} color="#FFF" />
            </button>
          </div>
        </section>
      </Container>
    </main>
  );
}
