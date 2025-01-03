"use client";

import { FormEvent, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";
export function Input() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  function handleSearch(event: FormEvent) {
    event.preventDefault();
    if (search === "") return;
    router.push(`/game/search/${search}`);
  }
  return (
    <form
      onSubmit={handleSearch}
      className="w-full bg-slate-200 my-5 flex justify-center items-center gap-2 rounded-lg p-2"
    >
      <input
        className="w-full outline-none bg-slate-200"
        placeholder="Procurando algum jogo?..."
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" title="Search">
        <FiSearch size={24} color="#ea580c" />
      </button>
    </form>
  );
}
