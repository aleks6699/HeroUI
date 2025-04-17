import { useState } from 'react';

interface Meme {
  id: number;
  name: string;
  image: string;
  likes: number;
}

interface MemeErrors {
  name: string;
  image: string;
  likes: string;
}

export function useEditMeme() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMeme, setCurrentMeme] = useState<Meme | null>(null);
  const [errors, setErrors] = useState<MemeErrors>({
    name: '',
    image: '',
    likes: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const validate = (meme: Meme): boolean => {
    const newErrors: MemeErrors = {
      name: meme.name.trim().length < 3 || meme.name.length > 100 
        ? 'Name must be between 3 and 100 characters' 
        : '',
      image: !meme.image || !/\.(jpe?g|png|gif|webp)$/i.test(meme.image)
        ? 'Please enter a valid image URL (jpg, png, gif, webp)' 
        : '',
      likes: isNaN(meme.likes) || meme.likes < 1 || meme.likes > 99
        ? 'Likes must be a number between 1 and 99'
        : ''
    };

    setErrors(newErrors);
    return !newErrors.name && !newErrors.image && !newErrors.likes;
  };

  const handleEditClick = (meme: Meme) => {
    setSaveError(null);
    setErrors({ name: '', image: '', likes: '' });
    setCurrentMeme(meme);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedMeme: Meme, saveHandler: (meme: Meme) => Promise<boolean>) => {
    if (!validate(updatedMeme)) return false;
    
    setIsSaving(true);
    setSaveError(null);
    
    try {
      const success = await saveHandler(updatedMeme);
      if (success) {
        setIsModalOpen(false);
      }
      return success;
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Failed to save meme');
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const reset = () => {
    setCurrentMeme(null);
    setErrors({ name: '', image: '', likes: '' });
    setSaveError(null);
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    currentMeme,
    errors,
    isSaving,
    saveError,
    handleEditClick,
    handleSave,
    closeModal: reset,
    validate
  };
}