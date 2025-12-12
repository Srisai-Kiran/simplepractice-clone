import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Dev-only: load Tailwind runtime from Play CDN so utilities work immediately */}
          <script src="https://cdn.tailwindcss.com" defer></script>
          <link rel="stylesheet" href="/tailwind.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
