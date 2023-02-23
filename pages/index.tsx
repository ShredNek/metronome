import Head from "next/head";
import Metronome from "@/components/Metronome";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="app-background">
          <h1>Metronome</h1>
          <h2>Your free, online, rhythmic companion!</h2>
        </div>
        <Metronome></Metronome>
        <Footer></Footer>
      </main>
    </>
  );
}
