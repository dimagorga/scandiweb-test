import { Component } from "react";
import { connect } from "react-redux";
import {
  incrementValue,
  removeProduct,
  decrementValue,
} from "../../redux/product/product-actions";
import s from "./Counter.module.css";

class Counter extends Component {
  increment = () => {
    return this.props.increment(1);
  };

  decrement = () => {
    if (this.props.value === 1) {
      this.props.removeProduct(this.props.id);
    }
    return this.props.decrement(1);
  };

  render() {
    return (
      <div className={s.counter}>
        <button
          className={!this.props.pageSize ? s.btn : s.bigBtn}
          onClick={this.increment}
        >
          +
        </button>
        <span className={this.props.pageSize && s.bigValue}>
          {this.props.value}
        </span>
        <button
          className={!this.props.pageSize ? s.btn : s.bigBtn}
          onClick={this.decrement}
        >
          -
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  increment: (value) => dispatch(incrementValue(value)),
  decrement: (value) => dispatch(decrementValue(value)),
  removeProduct: (id) => dispatch(removeProduct(id)),
});

export default connect(null, mapDispatchToProps)(Counter);
