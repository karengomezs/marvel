import { Html, Head, Main, NextScript } from "next/document";
import Nav from "@/components/nav";

export default function Document() {
  return (
    <Html lang="en">
      <Head></Head>
      <body>
        <Nav />
        <Main />

        <NextScript />
      </body>
    </Html>
  );
}
