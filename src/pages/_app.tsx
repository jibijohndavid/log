import { AppProps } from 'next/app';
import Head from 'next/head';
import 'tailwindcss/tailwind.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>LOG</title>
        <meta name="description" content="Log by Jibi John David" />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="keywords" content="Keywords" />

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/images/meta/favicon-16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/images/meta/favicon-32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/images/meta/icon-apple.png"></link>
        <meta name="theme-color" content="#16161E" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
