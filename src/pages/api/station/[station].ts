import {NextApiRequest} from "next"
import {NextApiResponse} from "next"
export default async function getData(req: NextApiRequest, res: NextApiResponse) {
  const instance = "https://transport.phipsiart.de"
  const station = req.query['station']
  const fetchstationurl = instance + "/locations?poi=false&addresses=false&query=" + station
  const fetchstation = await (await fetch(fetchstationurl)).json().catch(error=>{
       res.status(500).json({
        station: {
          "error": "true",
          "reason" :"Station not found"
        }
       })
  });
  const stationdata = fetchstation[0]
  const IBNR = stationdata['id']
  const name = stationdata['name']
  return(
  res.status(200).json({
    station: {
      IBNR,
      name
    }
  })
  )
}