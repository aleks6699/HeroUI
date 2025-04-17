import { useState, useEffect } from "react";
import { Meme } from "../dataBase/db";

export function useFetchMemes() {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMemes = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/memes");
      if (!response.ok) throw new Error("Failed to fetch memes");
      const data = await response.json();
      setMemes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemes();
  }, []);

  return { memes, setMemes, loading, error, refetch: fetchMemes };
}
