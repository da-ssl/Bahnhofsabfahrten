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
  const res  = await fetch("http://127.0.0.1:3000/api/departures/" + getstation)
  const data = await res.json()
  const departuredata = data['result']
  const delaycolor = data['delaycolorresult']
  const creationdate = data['createdon']
  const stationname = data['stationname']
  return{
    props: {
      departuredataresponse : departuredata,
      delayColorResult: delaycolor,
      createdon: creationdate,
      station: stationname
    }
  }
}
const Page = ({departuredataresponse, delayColorResult, createdon, station}) =>{
  const router = useRouter();
  function refreshdata(){
    router.replace(router.asPath);
  }
  
return(
  <>
  <Head>
  <title>Abfahrten in {station}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</Head>
<main className={inter.className}>
  <Header></Header>
   <h1 className={styles.headline}>aktuelle Abfahrten in {station} </h1>
   </main>
   <div className={inter.className}>
    <div className={styles.departures}>
    <table>
    <thead>
  <tr>
    <th>Linie</th>
    <th>Ziel</th>
    <th>Abfahrt</th>
    <th>Gleis</th>
    <th>Verspätung</th>
  </tr>
  </thead>
  <tbody>
  {Object.values(departuredataresponse).map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((item, itemIndex) => (
            <td
              key={`${rowIndex}-${itemIndex}`}
              style={{
                color:
                  itemIndex === row.length - 1 ? delayColorResult[rowIndex] : undefined,
              }}
            >
              {item}
            </td>
          ))}
        </tr>
      ))}
</tbody>
</table> 
      </div>
    <div className={styles.footer}>
      <footer>
        <span>Daten von {createdon}  Daten <button onClick={refreshdata} className={styles.refreshbutton}>aktualisieren</button> Alle Angaben ohne Gewähr.</span>
      </footer>
    </div>
   </div>
</>
)
}
export default Page;