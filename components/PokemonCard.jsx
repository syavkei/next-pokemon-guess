"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PokemonCard({ pokemon, isCorrect }) {
  const [data, setData] = useState({});

  useEffect(() => {
    try {
      const fetchData = async () => {
        if (!pokemon) return;
        const result = await axios.get(pokemon.url);
        setData(result.data);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [pokemon]);

  return (
    <div className="card">
      <img
        src={data?.sprites?.front_default}
        alt={"Pokemon"}
        className={isCorrect ? "card__img--correct" : "card__img--incorrect"}
        style={{
          marginTop: "20px",
          transform: "scale(2.5)",
        }}
      />
    </div>
  );
}
