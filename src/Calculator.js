import React from "react";
import "./style.css";

class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "", //For Input and Result Display
      result: [], //For History Display
      prevResult: [] //For History Display
    };
    this.handleChange = this.handleChange.bind(this);
    this.calculate = this.calculate.bind(this);
    this.back = this.back.bind(this);
  }

  handleChange(event) {
    //Event Handler for button clicks, operators and operands states
    const { name, value, type, checked } = event.target;
    //console.log(name, value);
    const operators = ["+", "-", "/", "*", "%"];
    let text = this.state.text;
    //console.log(text);
    //console.log(text.charAt(text.length - 2));

    if (event.key === "Enter") {
      //command to get result on enter_key press on keybaord
      this.calculate();
    }
    if (event.key === "=") {
      //command to get result on equal_key press on keyboard
      this.calculate();
    }
    if (
      //code to implement functionality (e)
      //if last char and last char -1 equal to operators then
      operators.indexOf(value) !== -1 &&
      operators.indexOf(text.charAt(text.length - 1)) !== -1
    ) {
      // console.log(text, value);
      text = text.substr(0, text.length - 1) + value;
      this.setState({ [name]: text });
    } else if (operators.indexOf(value) !== -1) {
      this.setState({ [name]: text + value });
    } else {
      this.setState({ [name]: value });
    }

    const totalOp = text.split("").filter(elt => operators.indexOf(elt) >= 0)
      .length; //returns total no of operators in input
    if (
      //code for functionality (f)
      text.length >2 &&
      operators.indexOf(text.charAt(text.length - 2)) !== -1 &&
      operators.indexOf(text.charAt(text.length - 1)) === -1 &&
      operators.indexOf(value) !== -1
    ) {
      this.setState({
        text: text.slice(0, -1)
      });
      this.calculate();
    }
  }

  calculate(event) {
    //Event Handler for calculation of result and assignment of data
    //to state variables
    this.setState(prevState => ({
      text: (eval(this.state.text) || "") + "",
      result: [...prevState.result, this.state.text + " "],
      prevResult: [
        ...prevState.prevResult,
        +(eval(this.state.text) || "") + " "
      ]
    }));
  }

  back(event) {
    //Event Handler for backspace, Ce and C functionality
    const { name, value, type, checked } = event.target;
    // if name= backspace then delete last char else delete full
    name === "backspace"
      ? this.setState({ text: this.state.text.slice(0, -1) })
      : this.setState({ text: "" });
  }

  render() {
    //Buttons and their values and Output
    return (
      <div>
        <div className="resultbar">
          <input //input box
            style={{ height: "30px", width: "80%", font: "20px" }}
            name="text"
            autoFocus="autofocus"
            value={this.state.text}
            onChange={this.handleChange}
            onKeyPress={this.handleChange}
          />
        </div>

        <div className="history">
          <h2>History</h2>
          <h3 style={{ color: "red" }}>{this.state.result} </h3>
          <p>{this.state.prevResult}</p>
        </div>

        <div className="buttons">
          <button name="text" value={"+"} onClick={this.handleChange}>
            +
          </button>

          <button name="text" value={"-"} onClick={this.handleChange}>
            -
          </button>

          <button
            type="adbc"
            name="text"
            value={"*"}
            onClick={this.handleChange}
          >
            *
          </button>

          <button name="text" value={"/"} onClick={this.handleChange}>
            /
          </button>

          <button
            name="text"
            value={this.state.text + "1"}
            onClick={this.handleChange}
          >
            1
          </button>

          <button
            name="text"
            value={this.state.text + "2"}
            onClick={this.handleChange}
          >
            2
          </button>

          <button
            name="text"
            value={this.state.text + "3"}
            onClick={this.handleChange}
          >
            3
          </button>

          <button name="text" value={"%"} onClick={this.handleChange}>
            %
          </button>

          <button
            name="text"
            value={this.state.text + "4"}
            onClick={this.handleChange}
          >
            4
          </button>

          <button
            name="text"
            value={this.state.text + "5"}
            onClick={this.handleChange}
          >
            5
          </button>

          <button
            name="text"
            value={this.state.text + "6"}
            onClick={this.handleChange}
          >
            6
          </button>

          <button name="text" type="abc" onClick={this.back}>
            C
          </button>

          <button
            name="text"
            value={this.state.text + "7"}
            onClick={this.handleChange}
          >
            7
          </button>

          <button
            name="text"
            value={this.state.text + "8"}
            onClick={this.handleChange}
          >
            8
          </button>

          <button
            name="text"
            value={this.state.text + "9"}
            onClick={this.handleChange}
          >
            9
          </button>

          <button name="backspace" onClick={this.back}>
            Ce
          </button>

          <button
            name="text"
            value={this.state.text + "."}
            onClick={this.handleChange}
          >
            .
          </button>

          <button
            name="text"
            value={this.state.text + "0"}
            onClick={this.handleChange}
          >
            0
          </button>

          <button name="text" type="dbac" value="=" onClick={this.calculate}>
            =
          </button>

          <button name="backspace" onClick={this.back}>
            ~
          </button>
        </div>
      </div>
    );
  }
}
export default Calculator;
