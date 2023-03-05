import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Departures.module.css'
import Header from '../../../components/Header/header'
import Loader from '../../../components/Loader/loader'
const inter = Inter({ subsets: ['latin'] })
const baseurl = "http://127.0.0.1:3000"
import { useRouter } from 'next/router'
export default async function Home() {
  const router = useRouter();
  const getstation = router.asPath.slice(12)
  async function fetchdata(){
    const fetchstation = await (await fetch(baseurl + "/api/station/" + getstation)).json()
    const stationname = fetchstation['station']['name']
    return stationname;
  }
  const data = await fetchdata()
  return (
    <>
      <Head>
        <title>{}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Loader></Loader>
      <Header></Header>
      <main className={inter.className}>
        <h1 className={styles.headline}>Daten werden geladen</h1>
        <p className={styles.loadingtext}>Bahnhof {getstation} wird gesucht</p>
</main>
    </>
  )
  }
