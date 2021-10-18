import { Component } from "react";
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
        </button>
        {this.state.showModal && (
          <NavCartModal onCloseModal={this.onModalClose} />
        )}
      </>
    );
  }
}

export default NavCartButton;
