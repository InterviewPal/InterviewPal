import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="font-body bg-rosePineDawn-base text-rosePineDawn-text dark:bg-rosePineMoon-base dark:text-rosePineMoon-text">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
