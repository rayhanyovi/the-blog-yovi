import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="h-full overflow-hidden">
      <Head />
      <body className="h-full overflow-auto flex flex-col">
        <div className="flex flex-grow flex-col">
          <Main />
        </div>
        <NextScript />
        <footer className="flex w-full bg-primary justify-center py-2 text-white">
          Muhammad Rayhan Yovi, 2024
        </footer>
      </body>
    </Html>
  );
}
