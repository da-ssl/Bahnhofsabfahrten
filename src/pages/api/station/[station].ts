import {NextApiRequest} from "next"
import {NextApiResponse} from "next"
var _ = require('lodash')
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
  const fetchdepartures = await (await fetch(instance + "/stops/" + IBNR + "/departures?results=10&taxi=false&tram=false&bus=false&duration=1280")).json().catch(error=>{
console.log(error)
  });
  const fetchdeparturesapiresult = fetchdepartures['departures']
  const departuresconvert = JSON.stringify(fetchdeparturesapiresult,
    (key, value) => (value === null) ? '' : value
  );
  var fetchdeparturesresult = JSON.parse("" + departuresconvert + "");
  const getlines = _.map(fetchdeparturesresult, 'line')
  const lines = _.map(getlines, 'name')
  const delaysapiresult = _.map(fetchdeparturesresult, 'delay') ;
  const planneddeparturesapiresult = _.map(fetchdeparturesresult, 'plannedWhen')
  const destination = _.map(fetchdeparturesresult, 'direction')
  const platform = _.map(fetchdeparturesresult, 'platform')
  const delaysconvert = JSON.stringify(delaysapiresult,
    (key, value) => (value === 0) ? 'pünktlich' : value,
  );
  var delays = JSON.parse("" + delaysconvert + "");
  var planneddepartures = planneddeparturesapiresult.map((planneddeparturesapiresult: string) => planneddeparturesapiresult.substring(11).substring(0,5)) 
  return(
  res.status(200).json({
    station: {
      IBNR,
      name
    },
      departures: {
      lines,
      destination,
      platform,
       planneddepartures,
       delays
    }
  })
  )
}