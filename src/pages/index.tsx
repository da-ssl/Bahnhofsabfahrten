import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Header from '../../components/Header/header'
import { useRouter } from 'next/router'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  function searchstation(){
    let getsearchvalue : string = (document.getElementById("searchvalue") as HTMLInputElement).value;
    let getnumberofresults : string = (document.getElementById("numberofresults") as HTMLInputElement).value;
    if (getsearchvalue != ""){
    const redirecturl = "/departures/" + getsearchvalue + "&results=" + getnumberofresults
    router.push(redirecturl)
    }
    if (getsearchvalue ==""){
      router.push("/departures")
    }
}
  return (
    <>
      <Head>
        <title>Bahnhofsabfahrten</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header></Header>
      <main className={inter.className}>
        <h1 className={styles.headline}>Bahnhofsabfahrten</h1>
        <div className={styles.search} id={styles.searchfield}>
        <input  autoComplete="off" role="presentation" required className={styles.boxanimation} type="text" id="searchvalue" placeholder="nach einem Bahnhof suchen"></input>
        <input  autoComplete="off" role="presentation" required className={styles.boxanimation2} type="number" id="numberofresults" placeholder="Anzahl der Ergebnisse" defaultValue="10"></input>
        <button  onClick={searchstation} className={styles.inputbutton}>Suchen</button>
       </div>
      </main>
    </>
  )
}
