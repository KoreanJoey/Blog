import Link from "next/link";

export default function ContentDetailView() {
    const title = "Internship log"
    const content = "Today was so fun!"
    return (
      <>
        <h1>{title}</h1>
        <p>{content}</p>
        <div><Link href={"/"}>Go back</Link> 
        </div>
      </>
    );
  }
  