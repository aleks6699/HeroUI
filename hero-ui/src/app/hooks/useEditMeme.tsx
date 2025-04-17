import { useState } from 'react';

interface Meme {
  id: number;
  name: string;
  image: string;
  likes: number;
}

export function useEditMeme(memes: Meme[], setMemes: (memes: Meme[]) => void) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMeme, setCurrentMeme] = useState<Meme | null>(null);
  const [errors, setErrors] = useState({
    name: '',
    image: ''
  });

  const validate = (meme: Meme): boolean => {
    let isValid = true;
    const newErrors = { name: '', image: '' };

    if (meme.name.length < 3 || meme.name.length > 100) {
      newErrors.name = 'Name must be between 3 and 100 characters';
      isValid = false;
    }

    const imageRegex = /\.(jpeg|jpg)$/i;
    if (!imageRegex.test(meme.image)) {
      newErrors.image = 'Image URL must end with .jpg or .jpeg';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleEditClick = (meme: Meme) => {
    setErrors({ name: '', image: '' });
    setCurrentMeme(meme);
    setIsModalOpen(true);
  };

  const handleSave = (updatedMeme: Meme) => {
    if (validate(updatedMeme)) {
      setMemes(memes.map((m) => (m.id === updatedMeme.id ? updatedMeme : m)));
      setIsModalOpen(false);
    }
  };

  return {
    isModalOpen,
    currentMeme,
    errors,
    handleEditClick,
    handleSave,
    closeModal: () => setIsModalOpen(false),
  };
}