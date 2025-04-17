"use client";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { Button } from "@heroui/button";
import { useFetchMemes } from "../hooks/useFetchMemes";
import { Loading } from "../components/Loading/Loading";
import Link from "next/link";
import { useEditMeme } from "../hooks/useEditMeme";
import { MemeModal } from "../components/Modal/MemoModal";

const columns = [
  { id: "id", label: "ID" },
  { id: "name", label: "Name" },
  { id: "image", label: "Image URL" },
  { id: "likes", label: "Likes" },
  { id: "edit", label: "Edit" },
];

export default function TablePage() {
  const { memes, setMemes, loading, error } = useFetchMemes();
  const { isModalOpen, currentMeme, handleEditClick, handleSave, closeModal, errors } = useEditMeme(memes, setMemes);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8 tracking-wide">Memes Table</h1>
      <Table className="w-full max-w-4xl shadow-xl rounded-2xl overflow-hidden bg-white">
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.id} className="text-left px-6 py-4 bg-gray-100 text-gray-700 font-semibold uppercase">
              {column.label}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {memes.map((meme) => (
            <TableRow key={meme.id} className="hover:bg-gray-50">
              <TableCell className="px-6 py-4">{meme.id}</TableCell>
              <TableCell className="px-6 py-4 font-medium text-gray-800 ">{meme.name}</TableCell>
              <TableCell className="px-6 py-4 text-blue-500 hover:underline break-all">
                <Link href={meme.image} target="_blank">
                  {meme.image}
                </Link>
              </TableCell>
              <TableCell className="px-6 py-4">{meme.likes}</TableCell>
              <TableCell className="px-6 py-4">
                <Button className="cursor-pointer hover:text-amber-500 transition-colors" onPress={() => handleEditClick(meme)}>
                  ✏️
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <MemeModal isOpen={isModalOpen} onClose={closeModal} meme={currentMeme} onSave={handleSave} errors={errors} />
    </div>
  );
}
