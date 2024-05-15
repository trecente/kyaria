import Link from "next/link";

import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="py-6">
      <div className="container">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground">
          Built by{" "}
          <Link
            href={siteConfig.links.github}
            target="_blank"
            className="font-medium underline underline-offset-4"
          >
            Lucas Trecente
          </Link>
          . The source code is available on{" "}
          <Link
            href={siteConfig.links.github_repo}
            target="_blank"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
