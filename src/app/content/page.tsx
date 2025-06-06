import Link from "next/link";

export default function CreateContent() {
    const title = ""
    const content = ""
    return (
      <>
        <h1>{title}</h1>
        <p>{content}</p>
        <div><Link href={"/"}>Cancel</Link> 
        <Link href={"/"}>Save</Link>
        </div>
      </>
    );
  }
  