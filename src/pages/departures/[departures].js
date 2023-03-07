import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Departures.module.css'
import Header from '../../../components/Header/header'
var _ = require('lodash')
const inter = Inter({ subsets: ['latin'] })
export const getServerSideProps = async ({params}) => {
  const getparams = {params}
  const getstation = params['departures']
  const res  = await fetch("https://bahnhofsabfahrten.phipsiart.de/api/station/" + getstation)
  const data = await res.json()
  const stationname = data['station']['name']
  const platforms = data['departures']['platform']
  const lines = data['departures']['lines']
  const destinationapiresult = data['departures']['destination']
  const departuresapiresult = data['departures']['planneddepartures']
  const delays = data['departures']['delays']
  return{
    props: {
      currentstation: stationname,
      platform: platforms,
      line: lines,
      destination: destinationapiresult,
      departure: departuresapiresult,
      delay: delays
    }
  }
}
const Page = ({currentstation, platform, line, destination, departure, delay}) =>{
return(
  <>
  <Head>
  <title>Abfahrten in {currentstation}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</Head>
<main className={inter.className}>
  <Header></Header>
   <h1 className={styles.headline}>aktuelle Abfahrten in {currentstation}</h1>
   {/*Start der aktuellen Abfahrten */}
   </main>
   <div className={inter.className}>
    <div className={styles.departures}>
    <div className={styles.wrapper}>
      <div className={styles.line}>
      <p className={styles.info}>Linie</p>
    {line.map((line, key) => {
          return (
            <p className={styles.departures} key={key}>
              {line}
            </p>
          )
        })}
      </div>
      <div className={styles.destination}>
      <p className={styles.info}>Ziel</p>
    {destination.map((destination, key) => {
          return (
            <p className={styles.ziel} key={key}>
              {destination}
            </p>
          )
        })}
      </div>
      <div className={styles.departure}>
      <p className={styles.info}>Abfahrt</p>
    {departure.map((departure, key) => {
          return (
            <p className={styles.abfahrt} key={key}>
              {departure}
            </p>
          )
        })}
      </div>
      <div className={styles.platform}>
      <p className={styles.info}>Gleis</p>
    {platform.map((platform, key) => {
          return (
            <p className={styles.gleis} key={key}>
              {platform}
            </p>
          )
        })}
      </div>
      <div className={styles.delays}>
      <p className={styles.info}>Verspätung in Sekunden</p>
    {delay.map((delay, key) => {
          return (
            <p className={styles.verspaetung} key={key}>
            {delay}
            </p>
          )
        })}
      </div>
    </div>
    </div>
   </div>
</>
)
}
export default Page;
