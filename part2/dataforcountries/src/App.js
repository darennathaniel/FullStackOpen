import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const [filterWord, setFilterWord] = useState("");
  const [show, setShow] = useState(false);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleChange = (e) => {
    setFilterWord(e.target.value);
  };
  return (
    <div>
      <p>
        find countries{" "}
        <input
          onChange={(e) => {
            handleChange(e);
          }}
        ></input>
      </p>
      {data.filter((word) =>
        word.name.toLowerCase().includes(filterWord.toLowerCase())
      ).length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : data.filter((word) =>
          word.name.toLowerCase().includes(filterWord.toLowerCase())
        ).length === 1 ? (
        data
          .filter((word) =>
            word.name.toLowerCase().includes(filterWord.toLowerCase())
          )
          .map((data) => {
            return (
              <div key={parseInt(data.numericCode)}>
                <h1>{data.name}</h1>
                <p>capital {data.capital}</p>
                <p>population {data.population}</p>
                {data.languages.map((language) => {
                  return <li>{language.name}</li>;
                })}
                <img src={data.flag} style={{ width: "25%" }} alt="Flag"></img>
              </div>
            );
          })
      ) : show ? (
        <div>
          <h1>
            {
              data.filter((word) =>
                word.name.toLowerCase().includes(filterWord.toLowerCase())
              )[index].name
            }
          </h1>
          <p>
            capital{" "}
            {
              data.filter((word) =>
                word.name.toLowerCase().includes(filterWord.toLowerCase())
              )[index].capital
            }
          </p>
          <p>
            population{" "}
            {
              data.filter((word) =>
                word.name.toLowerCase().includes(filterWord.toLowerCase())
              )[index].population
            }
          </p>
          {data
            .filter((word) =>
              word.name.toLowerCase().includes(filterWord.toLowerCase())
            )
            [index].languages.map((language) => {
              return <li>{language.name}</li>;
            })}
          <img
            src={
              data.filter((word) =>
                word.name.toLowerCase().includes(filterWord.toLowerCase())
              )[index].flag
            }
            style={{ width: "25%" }}
            alt="Flag"
          ></img>
          <button onClick={() => setShow(false)}>close</button>
        </div>
      ) : (
        data
          .filter((word) =>
            word.name.toLowerCase().includes(filterWord.toLowerCase())
          )
          .map((data, index) => {
            return (
              <div>
                <p key={parseInt(data.numericCode)}>{data.name}</p>
                <button
                  onClick={() => {
                    setShow(true);
                    setIndex(index);
                    const params = {
                      access_key: "f0fdc32e50a5296f5f2d054cb588495e",
                      query: "New York",
                    };
                    axios
                      .get("https://api.weatherstack.com/current", { params })
                      .then((res) => {
                        console.log(res.data);
                      })
                      .catch((err) => console.log(err));
                  }}
                >
                  show
                </button>
              </div>
            );
          })
      )}
    </div>
  );
};

export default App;
