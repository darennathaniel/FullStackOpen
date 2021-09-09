import React from "react";

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  return (
    <div>
      <Header course={course}></Header>
      <Content course={course}></Content>
      <Total course={course}></Total>
    </div>
  );
};
console.log("test");

const Header = (props) => {
  return <h1>{props.course.name}</h1>;
};

const Content = (props) => {
  return <Part parts={props.course.parts}></Part>;
};

const Total = (props) => {
  let num = 0;
  for (let i = 0; i < props.course.parts.length; i += 1) {
    num += props.course.parts[i].exercises;
  }
  return <p>Number of exercises {num}</p>;
};

const Part = (props) => {
  return props.parts.map((parts) => {
    return (
      <p>
        {parts.name} {parts.exercises}
      </p>
    );
  });
};

export default App;
