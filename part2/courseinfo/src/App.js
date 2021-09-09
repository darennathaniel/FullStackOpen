import React from "react";
import { Course } from "./Course";

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];
  return (
    <div>
      <h1>Web Development Curriculum</h1>
      {courses.map((course) => {
        return <Course key={course.id} course={course}></Course>;
      })}
    </div>
  );
};

// const Course = (props) => {
//   const { course } = props;
//   return (
//     <div>
//       <Header course={course}></Header>
//       <Content course={course}></Content>
//       <Total course={course}></Total>
//     </div>
//   );
// };

// const Header = (props) => {
//   return <h2>{props.course.name}</h2>;
// };

// const Content = (props) => {
//   return <Part parts={props.course.parts}></Part>;
// };

// const Total = (props) => {
//   const total = props.course.parts.reduce((s, p) => {
//     return s + p.exercises;
//   }, 0);
//   return <h4>total of {total} exercises</h4>;
// };

// const Part = (props) => {
//   return props.parts.map((parts) => {
//     return (
//       <p key={parts.id}>
//         {parts.name} {parts.exercises}
//       </p>
//     );
//   });
// };

export default App;
