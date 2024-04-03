import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found",
};

export default function NotFound() {
  return (
    <div className="flex h-[90vh] items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-semibold tracking-tight">404</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Oops! The page you requested is not found.
        </p>
      </div>
    </div>
  );
}
