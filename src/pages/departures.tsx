import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Departures.module.css'
import Header from '../../components/Header/header'
import { useRouter } from 'next/router'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Bahnhof nicht gefunden</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header></Header>
      <main className={inter.className}>
        <h1 className={styles.headline}>Bahnhof nicht gefunden</h1>
        <p className={styles.text}>Bitte stellen Sie sicher, dass Sie einen Bahnhof eingegeben haben oder sich nicht vertippt haben.</p>
        <div className={styles.button}>
            <Link className={styles.link} href="/">Home</Link>
        </div>
      </main>
    </>
  )
}
