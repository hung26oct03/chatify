import Head from "next/head";
import dynamic from "next/dynamic";
const loading = <p>Loading...</p>;

const AuthPage = dynamic(
    () => import("@/components/AuthPage/AuthPage"),
    {
      loading: () => loading,
      ssr: false
    }
);

const IndexPage = () => {
  return (
    <>
      <Head>
        <title>Chatify</title>
        <link rel="icon" href="/chatify_rm_bg.ico" sizes="64x64" />
      </Head>
      <AuthPage />
    </>
  );
};

IndexPage.layout = "homepage";

export default IndexPage;