import { PureComponent } from "react";
import { v4 as uuidv4 } from "uuid";
import s from "./ProductAttributes.module.css";

class ProductAttributes extends PureComponent {
  state = {
    color: "",
    size: "",
    capacity: "",
    wihtPorts: "",
    wihtTouch: "",
    attrs: [],
  };
  //no idea how i can make it correctly

  componentDidUpdate() {
    const { color, size, capacity, wihtPorts, wihtTouch } = this.state;

    const onAttributesClick = this.props.onAttributesClick;
    onAttributesClick([color, size, capacity, wihtPorts, wihtTouch]);
  }
  attrs = (e) => {
    const { name, value } = e.target;

    if (name === "Size") {
      this.setState({ size: value });
    }
    if (name === "Color") {
      this.setState({ color: value });
    }
    if (name === "Capacity") {
      this.setState({ capacity: value });
    }
    if (name === "With USB 3 ports") {
      this.setState({ wihtPorts: value });
    }
    if (name === "Touch ID in keyboard") {
      this.setState({ wihtTouch: value });
    }
  };

  render() {
    const { inStock, attributes } = this.props.product;
    return attributes.map((attr) => {
      return (
        <div key={attr.name} className={s.attributes}>
          <h2 className={s.attributesTitle}>{attr.name.toUpperCase()}:</h2>
          <div className={s.attributesList}>
            {attr.items.map((item) => {
              item.key = uuidv4();

              return (
                <div key={item.value} className={s.attributesForm}>
                  <input
                    onChange={this.attrs}
                    className={s.attrButton}
                    id={item.key}
                    type="radio"
                    name={attr.name}
                    value={item.value}
                    disabled={!inStock}
                  />
                  <label
                    className={
                      attr.name === "Color" ? s.coloredLabel : s.attrLabel
                    }
                    htmlFor={item.key}
                    style={{
                      backgroundColor:
                        attr.name === "Color" && `${item.displayValue}`,
                    }}
                  >
                    {item.value}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  }
}

export default ProductAttributes;
