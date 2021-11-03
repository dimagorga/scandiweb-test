import { Component } from "react";
import { Query } from "react-apollo";
import { connect } from "react-redux";
import { changeCurrency } from "../../redux/product/currencies-action";
import { currenciesRequest } from "../../services/gql-requests";
import s from "./NavCurrencyBtn.module.css";

class NavCurrencyBtn extends Component {
  state = {
    showModal: false,
  };
  onBtnClick = () => {
    this.setState((prev) => {
      return { showModal: !prev.showModal };
    });
  };

  selectCurrency = (e) => {
    this.props.onChangeCurrency(e.target.id);
    this.setState({
      showModal: false,
    });
  };

  render() {
    return (
      <Query query={currenciesRequest()}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error : </p>;
          const { currencies } = data;
          return (
            <div>
              <button
                className={s.select}
                type="button"
                onClick={this.onBtnClick}
              >
                {this.props.currencies}
              </button>
              {this.state.showModal && (
                <div className={s.options}>
                  {currencies.map((currency) => {
                    return (
                      <button
                        key={currency}
                        id={currency}
                        className={s.option}
                        onClick={this.selectCurrency}
                      >
                        {currency}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }}
      </Query>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.products.currencies,
});
const mapDispathcToProps = (dispatch) => ({
  onChangeCurrency: (currency) => dispatch(changeCurrency(currency)),
});

export default connect(mapStateToProps, mapDispathcToProps)(NavCurrencyBtn);
