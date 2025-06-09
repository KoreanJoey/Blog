import Link from "next/link";

export default function CreateContent() {
  const title = "";
  const content = "";
  return (
    <>
      <form action="" className="p-4">
        <div className="flex flex-col gap-2">
          <span>Title</span>
          <input type="text" className="w-44 border-2" />
          <span>Content</span>
          <textarea name="" id="" className="w-128 border-2"></textarea>
          <div className="flex flex-row gap-2 items-center">
            <Link href={"/"} className="w-20 bg-gray-600 rounded-sm">
              Cancel
            </Link>
            <Link href={"/"} className="w-20 bg-gray-600 rounded-sm">Save</Link>
          </div>
        </div>
      </form>
    </>
  );
}
