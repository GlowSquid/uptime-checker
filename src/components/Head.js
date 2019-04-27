import Head from "next/head";

function IndexPage() {
  return (
    <div>
      <Head>
        {/* <meta charset="utf-8" /> */}
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Free Website Pinger & Uptime Monitor"
        />
        <meta name="og:title" property="og:title" content="IsItDead" />
        <meta
          property="og:description"
          content="Free Website Pinger & Uptime Monitor"
        />
        <meta property="og:url" content="https://isitdead/xyz/" />
        <meta property="og:type" content="Service" />
        <meta property="og:image" content="ogp.png" />
        <meta property="og:image:alt" content="IID Logo" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
          integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
          crossOrigin="anonymous"
        />
        <title>IsItDead - Free Website Pinger & Uptime Monitor</title>
      </Head>
      {/* <p>Hello world!</p> */}
    </div>
  );
}

export default IndexPage;
