import React from "react";

function Door(props) {
  //props into variables
  const header = props.header;
  const num = props.num;
  const image = props.image;
  const handle = props.handle;

  return (
    <div>
      <h3>{header}</h3>
      <img value={num} src={image} onClick={handle} alt=""></img>
    </div>
  );
}

//export component
export default Door;
