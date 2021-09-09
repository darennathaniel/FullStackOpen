import React from "react";

export const Course = (props) => {
  const { course } = props;
  return (
    <div>
      <Header course={course}></Header>
      <Content course={course}></Content>
      <Total course={course}></Total>
    </div>
  );
};

const Header = (props) => {
  return <h2>{props.course.name}</h2>;
};

const Content = (props) => {
  return <Part parts={props.course.parts}></Part>;
};

const Total = (props) => {
  const total = props.course.parts.reduce((s, p) => {
    return s + p.exercises;
  }, 0);
  return <h4>total of {total} exercises</h4>;
};

const Part = (props) => {
  return props.parts.map((parts) => {
    return (
      <p key={parts.id}>
        {parts.name} {parts.exercises}
      </p>
    );
  });
};
