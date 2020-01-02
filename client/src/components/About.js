import React from "react";

const About = props => {
  return (
    <div>
      <h2>I am from About page</h2>
      <button onClick={() => props.history.push("/")}>Lets navigate</button>
    </div>
  );
};

export default About;
