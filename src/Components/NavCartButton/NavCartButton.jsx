import { Component } from "react";
import { connect } from "react-redux";
import { ReactComponent as CartIcon } from "../../Images/cartIcon.svg";
import NavCartModal from "../NavCartModal/NavCartModal";
import s from "./NavCartButton.module.css";

class NavCartButton extends Component {
  state = {
    showModal: false,
  };
  onIconClick = () => {
    this.setState((prev) => {
      return { showModal: !prev.showModal };
    });
  };

  onModalClose = () => {
    this.setState({
      showModal: false,
    });
  };

  render() {
    if (this.state.showModal) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
    return (
      <>
        <button type="button" onClick={this.onIconClick} className={s.buttton}>
          <CartIcon className={s.cartIcon} />
          {this.props.products.length > 0 && (
            <span className={s.productCount}>{this.props.products.length}</span>
          )}
        </button>
        {this.state.showModal && (
          <NavCartModal onCloseModal={this.onModalClose} />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products.items,
});

export default connect(mapStateToProps)(NavCartButton);
