"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import PokemonCard from "@/components/PokemonCard";

export default function Home() {
  const [pokemon, setPokemon] = useState(null);
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [score, setScore] = useState(0);
  const [guess, setGuess] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const getPokemon = async () => {
    setLoading(true);

    try {
      const data = await axios.get("/api/pokemon");
      console.log(data);
      setPokemon(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPokemon();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!guess) return;
    if (guess.toLowerCase() === currentPokemon.name) {
      setScore(score + 1);
      setGuess("");
      setIsCorrect(true);
      setTimeout(() => {
        setIsCorrect(false);
        getPokemon();
      }, 2000);
    } else {
      setGuess("");
    }
  };

  useEffect(() => {
    if (pokemon && !isError && !loading && pokemon.results) {
      console.log(pokemon.results);
      const randomPokemon = Math.floor(Math.random() * pokemon.results.length);
      setCurrentPokemon(pokemon.results[randomPokemon]);
    }
  }, [pokemon]);

  useEffect(() => {
    console.log(currentPokemon);
  }, [currentPokemon]);

  if (loading) {
    const statusMessage = loading ? "Loading..." : "Error!";
    return (
      <main className="flex flex-col items-center justify-center min-h-screen py-2 h-screen">
        <h1 className="text-4xl font-bold text-white">{statusMessage}</h1>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      {isError && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">
            Something went wrong. Please try again later.
          </span>
        </div>
      )}

      <h1 className="text-4xl font-bold text-center"></h1>
      <h2 className="text-3xl font-bold text-white">Score: {score}</h2>
      <PokemonCard pokemon={currentPokemon} isCorrect={isCorrect} />
      <form
        className="w-full max-w-sm"
        onSubmit={handleSubmit}
        style={{ marginTop: "2rem" }}
      >
        <div className="flex items-center border-b border-gray-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Which Pokemon is this?"
            aria-label="Full name"
            onChange={(e) => setGuess(e.target.value)}
            value={guess}
          />
          <button
            className="flex-shrink-0 bg-gray-500 hover:bg-gray-700 border-gray-500 hover:border-gray-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Submit
          </button>
          <button
            className="flex-shrink-0 border-transparent border-4 text-gray-800 text-sm py-1 px-2 rounded"
            type="button"
            onClick={() => {
              setGuess("");
              getPokemon();
            }}
          >
            Skip
          </button>
        </div>
      </form>
    </main>
  );
}
