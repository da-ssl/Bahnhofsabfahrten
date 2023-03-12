import {NextApiRequest} from "next"
import {NextApiResponse} from "next"
export default async function getData(req: NextApiRequest, res: NextApiResponse) {

  let station: string = "";
  let results: string = "1";
  
  let reqparams: string | string[] | undefined = req.query["departures"];
  if (typeof reqparams === "string") {
    [station, results] = reqparams.split("&");
  } else if (Array.isArray(reqparams)) {

  } else {

  }
  console.log(station)
  console.log(results)
const fetchdeparturesurl = "http://127.0.0.1:3000/api/station/" + station + "&" + results
const fetchdepartures = await (await fetch(fetchdeparturesurl)).json()
  let line = fetchdepartures['departures']['lines']
  let destination = fetchdepartures['departures']['destination']
  let departure = fetchdepartures['departures']['planneddepartures']
  let platform = fetchdepartures['departures']['platform']
  let delays = fetchdepartures['departures']['delays']
  const delaycolorresult = fetchdepartures['departures']['delaycolorresult']
  const createdon = fetchdepartures['info']['created-on']
  let result: {[key: number]: string[]} = {};
  
  for (let i = 0; i < delays.length; i++) {
      result[i] = [line[i], destination[i], departure[i], platform[i], delays[i]];
  }
  console.log(station)
  console.log(results)
  return(
    res.status(200).json({
        result,
        delaycolorresult,
        createdon
    })
    )
    }