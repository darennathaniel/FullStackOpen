import React, { useState } from "react";

const Statistics = (props) => {
  const {
    goodClick,
    neutralClick,
    badClick,
    good,
    neutral,
    bad,
    total,
    average,
    percentage,
  } = props;
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={goodClick}>good</button>
      <button onClick={neutralClick}>neutral</button>
      <button onClick={badClick}>bad</button>
      <h1>statistics</h1>
      {good === 0 && bad === 0 && neutral === 0 ? (
        <p>No feedback given</p>
      ) : (
        <>
          {/* <p>good {good}</p>
          <p>neutral {neutral}</p>
          <p>bad {bad}</p>
          <p>all {total}</p>
          <p>average {average}</p>
          <p>percentage {percentage}%</p> */}
          <StatisticLine text="good" value={good}></StatisticLine>
          <StatisticLine text="neutral" value={neutral}></StatisticLine>
          <StatisticLine text="bad" value={bad}></StatisticLine>
          <StatisticLine text="all" value={total}></StatisticLine>
          <StatisticLine text="average" value={average}></StatisticLine>
          <StatisticLine text="percentage" value={percentage}></StatisticLine>
        </>
      )}
    </div>
  );
};

const StatisticLine = (props) => {
  const { text, value } = props;
  return text === "percentage" ? (
    <tr>
      <td>{text}</td>
      <td>{value}%</td>
    </tr>
  ) : (
    <tr>
      <td>{text}</td>
      <tr>{value}</tr>
    </tr>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const goodClick = () => {
    setGood(good + 1);
  };

  const [neutral, setNeutral] = useState(0);
  const neutralClick = () => {
    setNeutral(neutral + 1);
  };

  const [bad, setBad] = useState(0);
  const badClick = () => {
    setBad(bad + 1);
  };

  let total = good + neutral + bad;
  let average = (good - bad) / total;
  let percentage = (good / total) * 100;
  return (
    <Statistics
      good={good}
      goodClick={goodClick}
      neutral={neutral}
      neutralClick={neutralClick}
      bad={bad}
      badClick={badClick}
      total={total}
      average={average}
      percentage={percentage}
    ></Statistics>
  );
};

export default App;
