import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const [filterWord, setFilterWord] = useState("");
  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
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
                <img src={data.flag} style={{ width: "25%" }}></img>
              </div>
            );
          })
      ) : (
        data
          .filter((word) =>
            word.name.toLowerCase().includes(filterWord.toLowerCase())
          )
          .map((data) => {
            return <p key={parseInt(data.numericCode)}>{data.name}</p>;
          })
      )}
    </div>
  );
};

export default App;
