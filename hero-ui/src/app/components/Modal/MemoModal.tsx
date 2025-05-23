"use client";
import { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { Input, InputProps } from "@heroui/input";
import { Button } from "@heroui/button";
import { Meme } from "@/app/dataBase/db";
type MemeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  meme: Meme | null;
  onSave: (meme: Meme) => Promise<void | boolean>;
  errors?: {
    name?: string;
    image?: string;
    likes?: string;
  };
  isSaving?: boolean;
};

export const MemeModal = ({ isOpen, onClose, meme, onSave, errors, isSaving = false }: MemeModalProps) => {
  const [formData, setFormData] = useState<Meme>({
    id: 0,
    name: "",
    image: "",
    likes: 0,
  });

  useEffect(() => {
    if (meme) setFormData(meme);
  }, [meme]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "likes" ? Math.max(0, parseInt(value) || 0) : value,
    }));
  };

  const handleSubmit = async () => {
    await onSave(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm z-40" />
      <ModalContent className="relative z-50 max-w-md w-full rounded-2xl shadow-2xl bg-gradient-to-br from-white to-gray-100 p-6 border border-gray-200 m-8">
        <ModalHeader className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">✏️ Edit Meme</ModalHeader>
        <ModalBody className="space-y-5">
          <InputField label="Name" name="name" value={formData.name} onChange={handleChange} isDisabled={isSaving} />
          {errors?.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <InputField label="Image URL" name="image" value={formData.image} onChange={handleChange} type="url" isDisabled={isSaving} />
          {errors?.image && <p className="text-red-500 text-sm">{errors.image}</p>}

          <InputField
            label="Likes"
            name="likes"
            value={String(formData.likes)}
            onChange={handleChange}
            type="number"
            min="0"
            isDisabled={isSaving}
          />
          {errors?.likes && <p className="text-red-500 text-sm">{errors.likes}</p>}
        </ModalBody>
        <ModalFooter className="flex justify-end pt-4 border-t mt-6 gap-3">
          <Button onPress={onClose} className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-lg" isDisabled={isSaving}>
            Cancel
          </Button>
          <Button onPress={handleSubmit} className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg" isLoading={isSaving}>
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
const InputField = ({ label, ...props }: InputProps) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <Input
      {...props}
      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
    />
  </div>
);