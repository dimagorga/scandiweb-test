import { PureComponent } from "react";
import { Link, withRouter } from "react-router-dom";
import s from "./ModalButtons.module.css";

class ModalButtons extends PureComponent {
  render() {
    const { onCloseModal, location } = this.props;
    return (
      <div className={s.buttons}>
        <Link
          to={{
            pathname: "/cart",
            state: { from: location },
          }}
        >
          <button className={s.buttonLink} onClick={onCloseModal}>
            VIEW BAG
          </button>
        </Link>
        <button className={s.button}>CHECK OUT</button>
      </div>
    );
  }
}

export default withRouter(ModalButtons);
