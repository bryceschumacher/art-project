import { useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import {art_data} from "../components/Iso";
import {country_data} from "../components/Iso";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";





export function CountryPage() {
  const location = useLocation();
  const country = location.state[0];
  const navigate = useNavigate();

  console.log("MEME")
  console.log(country_data)

 // transform our art data
 let transformed_art = {};
  for (let i = 0; i < art_data.length; i++) {
    let entry = art_data[i];
    let country = entry["Country"]
    if (country in transformed_art) {
      transformed_art[country].push(entry);
    } else {
      transformed_art[country] = [entry];
    }
  }
  console.log("lol")
  console.log(country)


  console.log(country_data)



  return (
    <div className="flex flex-col h-screen justify-between">
      <Header />
      <div className="mb-auto container mx-auto h-full">
        <button className="btn mt-16 mx-4 md:mx-0" onClick={() => navigate(-1)}>
          <ArrowBackIosNewIcon /> Back
        </button>
        <div className="grid grid-cols-1 h-5/6 md:grid-cols-2">
          <img style={{marginTop: "10%", height: "60%"}}
            src={country.flags.svg}
            alt={country.flags.alt}
          />
          <div className="h-full items-center">
            <h1 className="text-4xl font-extrabold mt-40 text-center">
              {country?.name.common}
            </h1>
            <div className="grid grid-cols-1 mt-4 text-lg text-center lg:grid-cols-2">
              <div className="grid gap-8 mx-12">
                <p>
                  <span className="font-bold">Capital: </span>
                  {country?.capital}
                </p>
                <p>
                  <span className="font-bold">Population: </span>
                  {country?.population}
                </p>
              </div>
              <div className="grid gap-8 mx-12">
                <p>
                  <span className="font-bold">Currencies: </span>
                  {Object.values(country?.currencies)
                    .map((currency) => {
                      return `${currency.name} (${currency.symbol})`;
                    })
                    .join(", ")}
                </p>
                <p>
                  <span className="font-bold">Language(s): </span>
                  {Object.values(country?.languages)
                    .map((language) => {
                      return `${language}`;
                    })
                    .join(", ")}
                </p>
              </div>
              
            </div>
          </div>
        </div>
        <div style={{marginTop: "-10%", paddingBottom: "10%", fontSize: "140%"}}>
          {country_data[country["cca2"]]?.map(item => {
          return <p>{item}<br></br><br></br></p>;
        })}
        </div>
        <div style={{paddingBottom: "10%"}}>
          {transformed_art[country["cca2"]]?.map(item => {
          return <div><img alt="" src={item["Link"]}></img><div style={{fontStyle: "italic"}}>{item["Title"]}</div><div>{item["Artist"]}</div><div><span style={{fontWeight: "bold"}}>{item["Museum name"]}</span> in {item["City"]}, {item["Country"]}</div></div>;
        })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
