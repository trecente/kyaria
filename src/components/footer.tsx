import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto flex justify-center p-4">
      <span className="text-sm font-medium">
        © {new Date().getFullYear()}{" "}
        <Link
          href="https://github.com/trecente/kyaria"
          className="hover:underline"
          target="_blank"
        >
          Kyaria
        </Link>
        . All Rights Reserved.
      </span>
    </footer>
  );
}
