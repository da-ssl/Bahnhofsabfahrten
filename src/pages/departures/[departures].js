import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Departures.module.css'
import Header from '../../../components/Header/header'
import { useRouter } from 'next/router'
var _ = require('lodash')
const inter = Inter({ subsets: ['latin'] })
export const getServerSideProps = async ({params}) => {
  const getparams = {params}
  const getstation = params['departures']
  const res  = await fetch("http://127.0.0.1:3000/api/station/" + getstation)
  const data = await res.json()
  const stationname = data['station']['name']
  const platforms = data['departures']['platform']
  const lines = data['departures']['lines']
  const destinationapiresult = data['departures']['destination']
  const departuresapiresult = data['departures']['planneddepartures']
  const delays = data['departures']['delays']
  const colorofdelays = data['departures']['delaycolorresult']
  const lastupdateddata = data['info']['created-on']
  return{
    props: {
      currentstation: stationname,
      delaycolor : colorofdelays,
      platform: platforms,
      line: lines,
      destination: destinationapiresult,
      departure: departuresapiresult,
      delay: delays,
      lastupdated : lastupdateddata,
    }
  }
}
const Page = ({currentstation, platform, line, destination, departure, delay, lastupdated, delaycolor}) =>{
  const router = useRouter();
  function refreshdata(){
    router.replace(router.asPath);
  }
  
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
  <p className={styles.info}>Verspätung</p>
  {delay.map((delay, key) => {
    return (
      <p
        className={styles.verspaetung}
        key={key}
        style={{ color: delaycolor[key] }}
      >
        {delay}
      </p>
    );
  })}
</div>
    </div>
    </div>
    <div className={styles.footer}>
      <footer>
        <span>Daten von  {lastupdated} Daten <button onClick={refreshdata} className={styles.refreshbutton}>aktualisieren</button> Alle Angaben ohne Gewähr.</span>
      </footer>
    </div>
   </div>
</>
)
}
export default Page;
