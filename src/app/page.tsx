import Link from "next/link";
import Header from "../components/header";

export default function Home() {
  const postList = [
    {
      title: "Post 1",
      date: "6th June 2025",
    },
    {
      title: "Post 2",
      date: "6th June 2025",
    },
    {
      title: "Post 3",
      date: "6th June 2025",
    },
    {
      title: "Post 4",
      date: "6th June 2025",
    },
    {
      title: "Post 5",
      date: "6th June 2025",
    },
  ];

  return (
    <>
      <Header/>

      <ul>
        {postList.map((post, index) => (
          <div className="m-2 p-4 bg-gray-800" key={index}>
            <Link href={`/${index}`}>
              {post.title}, {post.date}
            </Link>
          </div>
        ))}
      </ul>
      <div className="bg-gray-800 w-48 border-2 rounded-2xl">
        <Link className="p-6" href={"/content"}>
          Add Content
        </Link>
      </div>
    </>
  );
}
