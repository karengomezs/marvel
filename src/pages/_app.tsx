import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";

export const myFont = localFont({ src: "../../public/my-font.woff2" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={myFont.className}>
      <Component {...pageProps} />;
    </main>
  );
}
