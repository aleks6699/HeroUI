import { useState } from 'react';

interface Meme {
  id: number;
  name: string;
  image: string;
  likes: number;
}

export function useEditMeme() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMeme, setCurrentMeme] = useState<Meme | null>(null);
  const [errors, setErrors] = useState({
    name: '',
    image: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  const validate = (meme: Meme): boolean => {
    const newErrors = {
      name: meme.name.length < 3 || meme.name.length > 100 
        ? 'Name must be between 3 and 100 characters' 
        : '',
      image: !/\.(jpe?g|png|gif|webp)$/i.test(meme.image)
        ? 'Image must be a valid URL (jpg, png, gif, webp)' 
        : ''
    };

    setErrors(newErrors);
    return !newErrors.name && !newErrors.image;
  };

  const handleEditClick = (meme: Meme) => {
    setErrors({ name: '', image: '' });
    setCurrentMeme(meme);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedMeme: Meme, onSuccess: () => void) => {
    if (!validate(updatedMeme)) return false;
    
    setIsSaving(true);
    try {
      return await onSuccess();
    } finally {
      setIsSaving(false);
    }
  };

  return {
    isModalOpen,
    currentMeme,
    errors,
    isSaving,
    handleEditClick,
    handleSave,
    closeModal: () => setIsModalOpen(false),
  };
}