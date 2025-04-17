"use client";
import { Loading } from "../components/Loading/Loading";
import { useFetchMemes } from "../hooks/useFetchMemes";
import Image from "next/image";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";

export default function MemesListPage() {
  const { memes, loading, error } = useFetchMemes();

  if (loading) return <Loading />;
  if (error) return <div className="text-red-500 text-center p-4">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 sm:p-6">
      <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-6 text-center mt-20">Memes Gallery</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {memes.map((meme) => (
          <Card key={meme.id} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex justify-center pt-6">
              <div className="w-32 h-32 relative">
                <Image
                  src={meme.image}
                  alt={meme.name}
                  layout="fill"
                  className="rounded-full object-cover"
                  placeholder="blur"
                  blurDataURL={meme.image}
                  priority
                />
              </div>
            </CardHeader>

            <CardBody className="text-center px-4">
              <h2 className="text-xl font-semibold text-gray-800 truncate mb-2">{meme.name}</h2>
            </CardBody>

            <CardFooter className="flex justify-between items-center px-4 pb-4 text-sm text-gray-600">
              <span>
                Likes: <span className="font-bold text-gray-800">{meme.likes}💖</span>
              </span>
              <a href={meme.image} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 font-medium">
                View
              </a>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
