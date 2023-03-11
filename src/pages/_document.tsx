import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body className="font-body bg-rosePineDawn-base text-rosePine-text dark:bg-rosePine-base dark:text-rosePineMoon-text">
                <Main />
                <NextScript />
            </body>
            <Script src="/theme.js" strategy="beforeInteractive" />
        </Html>
    )
}
