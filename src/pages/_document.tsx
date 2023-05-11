import { Html, Head, Main, NextScript } from "next/document";
import Nav from "@/components/nav";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="//db.onlinewebfonts.com/c/12420e8c141ca7c3dff41de2d59df13e?family=BeaufortforLOL-Bold"
          rel="stylesheet"
          type="text/css"
        />
      </Head>
      <body>
        <Nav />
        <Main />

        <NextScript />
      </body>
    </Html>
  );
}
