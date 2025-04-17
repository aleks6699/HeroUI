import { useState } from "react";
import { Meme } from "../dataBase/db";

export function useEditMeme(memes: Meme[], setMemes: (memes: Meme[]) => void) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMeme, setCurrentMeme] = useState<Meme | null>(null);

  const handleEditClick = (meme: Meme) => {
    setCurrentMeme(meme);
    setIsModalOpen(true);
  };

  const handleSave = (updatedMeme: Meme) => {
    setMemes(memes.map((m) => (m.id === updatedMeme.id ? updatedMeme : m)));
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    currentMeme,
    handleEditClick,
    handleSave,
    closeModal: () => setIsModalOpen(false),
  };
}
