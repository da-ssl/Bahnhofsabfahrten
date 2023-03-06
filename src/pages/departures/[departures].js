import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Departures.module.css'
import Header from '../../../components/Header/header'
import Loader from '../../../components/Loader/loader'
const inter = Inter({ subsets: ['latin'] })
const baseurl = "http://127.0.0.1:3000"
export const getServerSideProps = async ({params}) => {
  const getparams = {params}
  console.log(getparams)
  const getstation = params['departures']
  console.log(getstation)
  const res  = await fetch(baseurl + "/api/station/" + getstation)
  const data = await res.json()
  const stationname = data['station']['name']
  return{
    props: {
      currentstation: stationname
    }
  }
}
const Page = ({currentstation}) =>{
return(
  <>
  <Head>
  <title>Abfahrten in {currentstation}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</Head>
<main className={inter.className}>
  <Loader></Loader>
  <Header></Header>
   <h1 className={styles.headline}>aktuelle Abfahrten in {currentstation}</h1>
</main>
</>
)
}
export default Page;
