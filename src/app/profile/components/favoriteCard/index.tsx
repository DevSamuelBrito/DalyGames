"use client";
import { FiEdit, FiX } from "react-icons/fi";
import { useState } from "react";




export function FavoriteCard() {
  const [input, setInput] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [game, setGame] = useState("");

  function handleButton() {
    setShowInput(!showInput);
    if (input !== "") {
      setGame(input);
    }

    setInput("");
  }

  return (
    <div className="w-full bg-gray-900 p-4 h-44 text-white flex justify-between flex-col">
      {showInput ? (
        <div className="flex items-center justify-center gap-3">
          <input
            type="text"
            className=" h-8 text-black px-2 w-full rounded-lg"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button onClick={handleButton}>
            <FiX size={24} color="#FFF" />
          </button>
        </div>
      ) : (
        <button
          className="self-start hover:scale-105 transition-all duration-200"
          onClick={handleButton}
        >
          <FiEdit size={24} color="#FFF" />
        </button>
      )}
      {game && (
        <div>
          <span className="text-white">Jogo Favorito:</span>
          <p className="font-bold text-white">{game}</p>
        </div>
      )}
      {!game && <p className="font-bold text-white">Adicionar Jogo</p>}
    </div>
  );
}
