import React from "react";
import "./style.css";
import "./App.css";
const operators = ["+", "-", "/", "*", "%"];
const buttons = [
  "+",
  "-",
  "*",
  "/",
  "%",
  "(",
  ")",
  "=",
  "1",
  "2",
  "3",
  "CE",
  "4",
  "5",
  "6",
  "C",
  "7",
  "8",
  "9",
  "~",
  ".",
  "0"
];
const getLastChar = (text = "") => text.slice(-1);
class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "",
      result: [],
      prevResult: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.calculate = this.calculate.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  handleChange({ target: { value } }) {
    let text = this.state.text;
    const isOperator = ~operators.indexOf(value);
    if (value === "=") {
      this.setState(prevState => this.calculate(prevState, this.state));
      return;
    }
    if (value === "CE" || value === "~") {
      text = text.slice(0, -1);
    } else if (value === "C") {
      text = "";
    } else if (isOperator && ~operators.indexOf(getLastChar(text))) {
      text = text.slice(0, -1) + value;
    } else {
      text += value;
    }

    const oprs = text.replace(/^-/, "").split(/[*+-/]/);
    if (oprs.length > 2) {
      let lastOprt = text.slice(-1);
      text = eval(text.slice(0, -1)) + lastOprt;
    }
    console.log(text.split(/[+-]/));
    this.setState({ text });
  }
  onInputChange({ target: { value: text } }) {
    if (buttons.indexOf(getLastChar(text)) === -1) {
      text = text.slice(0, -1);
    }
    this.setState({ text });
  }
  calculate(prevState, state) {
    try {
      const text = (eval(state.text) || "") + "";
      return {
        text,
        result: [...prevState.result, state.text],
        prevResult: [...prevState.prevResult, text]
      };
    } catch (event) {
      return {
        text: "error",
        result: "error",
        prevResult: "error"
      };
    }
  }
  render() {
    return (
      <div>
        <div className="resultbar">
          <input
            style={{ height: "30px", width: "200px", font: "20px" }}
            autoFocus="autofocus"
            value={this.state.text}
            onChange={this.onInputChange}
          />
        </div>

        <div className="history">
          <h2>History</h2>
          <h3 style={{ color: "red" }}>{this.state.result.join("   ")} </h3>
          <p>{this.state.prevResult.join("   ")}</p>
        </div>
        <div className="button">
          {buttons.map(x => (
            <button key={x} value={x} onClick={this.handleChange}>
              {x}
            </button>
          ))}
        </div>
      </div>
    );
  }
}
export default Layout;
