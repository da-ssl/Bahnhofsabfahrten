import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Loader from '../../components/Loader/loader'
import Header from '../../components/Header/header'
import { useRouter } from 'next/router'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  function searchstation(){
  const getsearchvalue = document.getElementById("searchvalue").value
  const redirecturl = "/departures/" + getsearchvalue
  router.push(redirecturl)
  }
  return (
    <>
      <Head>
        <title>Bahnhofsabfahrten</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Loader></Loader>
      <Header></Header>
      <main className={inter.className}>
        <h1 className={styles.headline}>Bahnhofsabfahrten</h1>
        <div className={styles.search} id={styles.searchfield}>
        <input  autoComplete="off" role="presentation" className={styles.boxanimation} type="text" id="searchvalue" placeholder="nach einem Bahnhof suchen"></input>
        <button  onClick={searchstation} className={styles.inputbutton}>Suchen</button>
       </div>
      </main>
    </>
  )
}
