export default async function Table() {
  const memes = await fetch("http://localhost:3000/api/memes").then((res) =>
    res.json()
  );
  console.log(memes);
  return null;
}
