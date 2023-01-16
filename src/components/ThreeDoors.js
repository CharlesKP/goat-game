import React, { useState } from "react";
import Door from "./Door";
import open from "../images/door-open.png";
import closed from "../images/door-closed.png";
import win from "../images/door-win.png";

import "../index.css";
import "bootstrap/dist/css/bootstrap.min.css";

//============================================================

function ThreeDoors(props) {
  //
  //
  //============================================================

  //click function first
  const firstPick = (e) => {
    let firstPick = parseInt(e.target.getAttribute("value"));

    console.log("first: " + firstPick);
    for (var i in obj.num) {
      //first door selected
      if (firstPick == obj.num[i][0]) {
        obj.num[firstPick][0] = firstPick;
        obj.num[firstPick][1] = "selected";
      }
    }
    //function for random door to be opened
    randomDoor(obj.num, firstPick);
  };

  //==========================================================

  //click second function
  const secondPick = (e) => {
    let secondPick = parseInt(e.target.getAttribute("value"));
    let closed;

    for (var i in obj.num) {
      if (obj.num[i][0] !== obj.num[secondPick][0] && obj.num[i][1] !== "x") {
        closed = obj.num[i];
      }
    }

    let arr = [obj.num[secondPick], closed];
    let winDoor = Math.random() < 0.5 ? arr[0][0] : arr[1][0];
    console.log("win: " + winDoor);

    //checking for win or lose
    if (secondPick == winDoor) {
      obj.num[secondPick] = [secondPick, true];
      obj.header = ["...", "...", "..."];
      obj.header[secondPick] = "YOU WIN!!!";
    } else {
      obj.num[winDoor] = [winDoor, true];
      obj.header = ["...", "...", "..."];
      obj.header[winDoor] = "YOU LOSE!!!";
    }

    arrayImages = [open, open, open];
    arrayImages[winDoor] = win;

    //set states
    setState(obj);
    setImages(arrayImages);
    setMsg(<br />);
  };

  let arrayImages = [];

  let obj = {
    header: [1, 2, 3],
    num: [
      [0, false],
      [1, false],
      [2, false],
    ],
    handle: [firstPick, firstPick, firstPick],
  };

  //state management for doors
  const [images, setImages] = useState([closed, closed, closed]);

  const [state, setState] = useState(obj);

  const [msg, setMsg] = useState("select a door");

  const [flag, setFlag] = useState(false);

  //==============================================================

  //SETTING WINNER FOR ROUND
  //function for random win number
  function randomDoor(doors, firstPick) {
    console.log("doors = " + doors + " | firstPick = " + firstPick);
    let doorOpen, doorClosed;
    doors.splice(firstPick, 1);
    doorOpen = Math.random() < 0.5 ? doors[0][0] : doors[1][0];

    for (var i in doors) {
      if (doors[i][0] !== doorOpen) {
        doorClosed = doors[i][0];
      }
    }

    //change array of door values and sort
    doors = [
      [firstPick, "selected"],
      [doorOpen, "x"],
      [doorClosed, false],
    ];

    doors.sort();

    //change click handeler - opendoor onclick function removed
    obj.handle[firstPick] = secondPick;
    obj.handle[doorClosed] = secondPick;
    obj.handle[doorOpen] = () => {
      console.log("removed");
    };

    //change what's displayed above the doors
    obj.header[firstPick] = "selected";
    obj.header[doorOpen] = "...";
    obj.num = doors;

    //change the door images
    arrayImages[firstPick] = closed;
    arrayImages[doorClosed] = closed;
    arrayImages[doorOpen] = open;

    console.log(" " + obj.num);

    //set states for images, information and msg
    setImages(arrayImages);
    let arrayOptions = [firstPick + 1, doorClosed + 1];
    arrayOptions.sort();
    setState(obj);

    //set message for second pick
    setMsg("Now pick between: " + arrayOptions[0] + " or " + arrayOptions[1]);
  }

  //=================================================

  // function to reset the game
  const reset = () => {
    //reset states
    obj = {
      header: [1, 2, 3],
      num: [
        [0, false],
        [1, false],
        [2, false],
      ],
      handle: [firstPick, firstPick, firstPick],
    };
    setFlag(false);
    setImages([closed, closed, closed]);
    setMsg("select a door");
    setState(obj);

    if (flag === false) {
      setFlag(true);
      setTimeout(() => {
        document.getElementById("res").click();
      }, 100);
    }
  };

  //=================================================

  return (
    <>
      <div className="message">
        <h3>{msg}</h3>
      </div>

      <div className="container center">
        <div className="row">
          <div className="col-sm">
            <Door
              header={state.header[0]}
              num={state.num[0]}
              image={images[0]}
              handle={state.handle[0]}
            />
          </div>
          <div className="col-sm">
            <Door
              header={state.header[1]}
              num={state.num[1]}
              image={images[1]}
              handle={state.handle[1]}
            />
          </div>
          <div className="col-sm">
            <Door
              header={state.header[2]}
              num={state.num[2]}
              image={images[2]}
              handle={state.handle[2]}
            />
          </div>
        </div>
      </div>
      <button id="res" className="reset btn btn-warning" onClick={reset}>
        reset
      </button>
    </>
  );
}

//export component
export default ThreeDoors;
