import Link from "next/link";

interface LinkItem {
  tag: string;
  href: string;
}

const links: LinkItem[] = [
  {
    tag: "Home",
    href: "/",
  },
  {
    tag: "Create Post",
    href: "/content",
  },
  {
    tag: "Post Detail View",
    href: "/1",
  },
  {
    tag: "Sign Up",
    href: "/auth/sign-up"
  },
  {
    tag: "Sign In",
    href: "/auth/sign-in"
  },
];

export default function DevNav() {
  return (
    <div className="fixed bottom-10 right-10">
      {links.map((link) => (
        <div key={link.tag}>
          <Link href={link.href}>{link.tag}</Link>
        </div>
      ))}
    </div>
  );
}
