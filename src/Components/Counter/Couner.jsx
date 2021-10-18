import { Component } from "react";
import s from "./Counter.module.css";

class Counter extends Component {
  state = {
    value: 1,
  };

  increment = () => {
    this.setState((prev) => ({
      value: prev.value + 1,
    }));
  };

  decrement = () => {
    this.setState((prev) => ({
      value: prev.value - 1,
    }));
  };

  render() {
    return (
      <div className={s.counter}>
        <button className={s.btn} onClick={this.increment}>
          +
        </button>
        <span>{this.state.value}</span>
        <button className={s.btn} onClick={this.decrement}>
          -
        </button>
      </div>
    );
  }
}
export default Counter;
