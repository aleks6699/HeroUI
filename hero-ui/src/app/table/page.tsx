"use client";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { Button } from "@heroui/button";
import { useFetchMemes } from "../hooks/useFetchMemes";
import { Loading } from "../components/Loading/Loading";
import Link from "next/link";
import { useEditMeme } from "../hooks/useEditMeme";
import { MemeModal } from "../components/Modal/MemoModal";
import { Meme } from "../dataBase/db";
const columns = [
  { id: "id", label: "ID" },
  { id: "name", label: "Name" },
  { id: "image", label: "Image URL" },
  { id: "likes", label: "Likes" },
  { id: "edit", label: "Edit" },
];


export default function TablePage() {
  const { memes, loading, error,  updateMeme } = useFetchMemes();
  const { 
    isModalOpen, 
    currentMeme, 
    handleEditClick, 
    handleSave, 
    closeModal, 
    errors,
    isSaving
  } = useEditMeme();

  const handleSaveWithAPI = async (updatedMeme: Meme) => {
    return handleSave(updatedMeme, async () => {
      const success = await updateMeme(updatedMeme);
      if (success) {
        closeModal();
      }
      return success;
    });
  };

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500 p-4">Error: {error}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-2 sm:p-4">
      <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-800 mb-4 sm:mb-8 tracking-wide mt-25">
        Memes Table
      </h1>
      
      <div className="w-full flex justify-center">
        <div className="w-full max-w-6xl overflow-x-auto">
        <Table className="min-w-[360px] w-full shadow-xl rounded-lg sm:rounded-2xl overflow-hidden bg-white mx-auto">
            <TableHeader>
              {columns.map((column) => (
                <TableColumn 
                  key={column.id} 
                  className="text-left px-2 sm:px-4 py-2 sm:py-4 bg-gray-100 text-gray-700 text-xs sm:text-sm font-semibold uppercase"
                >
                  {column.label}
                </TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {memes.map((meme) => (
                <TableRow key={meme.id} className="hover:bg-gray-50">
                  <TableCell className="px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-base">
                    {meme.id}
                  </TableCell>
                  <TableCell className="px-2 sm:px-4 py-2 sm:py-4 font-medium text-gray-800 text-xs sm:text-base">
                    {meme.name}
                  </TableCell>
                  <TableCell className="px-2 sm:px-4 py-2 sm:py-4 text-blue-500 hover:underline break-all text-xs sm:text-base">
                    <Link href={meme.image} target="_blank">
                      {meme.image.length > 20 ? `${meme.image.substring(0, 15)}...` : meme.image}
                    </Link>
                  </TableCell>
                  <TableCell className="px-2 sm:px-4 py-2 sm:py-4 text-xs sm:text-base">
                  💖{meme.likes}
                  </TableCell>
                  <TableCell className="px-2 sm:px-4 py-2 sm:py-4">
                    <Button 
                      className="cursor-pointer hover:text-amber-500 transition-colors text-xs sm:text-base"
                      onPress={() => handleEditClick(meme)}
                    >
                      ✏️
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <MemeModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        meme={currentMeme} 
        onSave={handleSaveWithAPI} 
        errors={errors}
        isSaving={isSaving}
      />
    </div>
  );
}