import {NextApiRequest} from "next"
import {NextApiResponse} from "next"
var _ = require('lodash')
export default async function getData(req: NextApiRequest, res: NextApiResponse) {
  const instance = "https://transport.phipsiart.de"

  let station: string = "";
  let results: string = "1";
  
  let reqparams: string | string[] | undefined = req.query["station"];
  if (typeof reqparams === "string") {
    [station, results] = reqparams.split("&");
  } else if (Array.isArray(reqparams)) {

  } else {

  }
  console.log(station)
  console.log(results)
  // You can now use station and results here
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
  const fetchdepartures = await (await fetch(instance + "/stops/" + IBNR + "/departures?"+ results +"&taxi=false&tram=false&bus=false&duration=1490")).json().catch(error=>{
console.log(error)
  });
  const fetchdeparturesapiresult = fetchdepartures['departures']
  var date = new Date(); 
  var time = date.getDate() + "."
   + (date.getMonth()+1)  + "." 
   + date.getFullYear() + " um "  
   + date.getHours() + ":"  
   + date.getMinutes() + ":" 
   + date.getSeconds();
    const departuresconvert = JSON.stringify(fetchdeparturesapiresult,
    (key, value) => (value === null) ? 'n/a' : value
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
  var delayswithoutminutes = JSON.parse("" + delaysconvert + "");
  let delays = [];
  for (let i = 0; i < delayswithoutminutes.length; i++) {
    if (typeof delayswithoutminutes[i] === "number") {
      let result = delayswithoutminutes[i] / 60;
      if (result > 1) {
          delays.push(result.toString() + " Minuten");
      } else if (result < 2){
        delays.push(result.toString() + " Minute");

      } else {
          delays.push(result.toString());
      }
  } else {
      delays.push(delayswithoutminutes[i]);
  }
  }
  let converttonumbers = delays.map(function(item) {
    if (item === 'pünktlich') {
        return 0;
    } else if (item.includes('Minute')) {
        return parseInt(item);
    } else if (item.includes('Minuten')) {
        return parseInt(item);
    } else {
        return item;
    }
});
  let delaycolor: (number | string)[] = converttonumbers;
  let delaycolorresult = delaycolor.map(function(item: number | string) {
      if (item === "n/a") {
          return "white";
      } else if (typeof item === "number" && item > 4) {
          return "red";
      } else {
          return "green";
      }
  });
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
       delays,
       delaycolorresult,
    },
    info:{
      "created-on": time
    }
  })
  )
  }