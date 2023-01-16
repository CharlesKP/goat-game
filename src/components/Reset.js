import React from "react";

class Reset extends React.Component {
  // This syntax ensures `this` is bound within handleClick.  // Warning: this is *experimental* syntax.
  handleClick = () => {
    window.location.reload();
  };

  render() {
    return (
      <div className="center">
        <button onClick={this.handleClick}>Reset Game</button>
      </div>
    );
  }
}

export default Reset;
