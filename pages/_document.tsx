import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
        <Main />
        <div id="modal-root"></div>
        <div id="toast-root"></div>
        <div id="alert-root"></div>
        <NextScript />
      </body>
    </Html>
  );
}
