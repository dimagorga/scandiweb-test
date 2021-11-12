import { PureComponent } from "react";
import s from "./ProductAttributes.module.css";

class ProductAttributes extends PureComponent {
  state = {
    color: "",
    size: "",
    capacity: "",
    attrs: [],
  };
  //no idea how i can make it correctly

  componentDidUpdate() {
    const { color, size, capacity } = this.state;

    const onAttributesClick = this.props.onAttributesClick;
    onAttributesClick([color, size, capacity]);
  }
  attrs = async (e) => {
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
  };

  render() {
    const { inStock, attributes } = this.props.product;
    return attributes.map((attr) => {
      return (
        <div key={attr.name} className={s.attributes}>
          <h2 className={s.attributesTitle}>{attr.name.toUpperCase()}:</h2>
          <div className={s.attributesList}>
            {attr.items.map((item) => {
              return (
                <div key={item.value} className={s.attributesForm}>
                  <input
                    onChange={this.attrs}
                    className={s.attrButton}
                    id={item.id}
                    type="radio"
                    name={attr.name}
                    value={item.value}
                    disabled={!inStock}
                  />
                  <label
                    className={
                      attr.name === "Color" ? s.coloredLabel : s.attrLabel
                    }
                    htmlFor={item.id}
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
