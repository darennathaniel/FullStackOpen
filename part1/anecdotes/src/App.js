import React, { useState, useEffect } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const points = [1, 5, 3, 2, 4, 6, 8];
  const [copy, setCopy] = useState(points[selected]);
  const [index, setIndex] = useState(0);
  const [max, setMax] = useState(0);

  useEffect(() => {
    for (let i = 0; i < points.length; i++) {
      if (points[i] > max) {
        setIndex(i);
        setMax(points[i]);
      }
    }
  }, []);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {copy} votes</p>
      <button
        onClick={() => {
          let x = copy + 1;
          setCopy(x);
        }}
      >
        vote
      </button>
      <button
        onClick={() => {
          setSelected(selected + 1);
          setCopy(points[selected + 1]);
        }}
      >
        next anecdote
      </button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[index]}</p>
      <p>has {max} votes</p>
    </div>
  );
};

export default App;
