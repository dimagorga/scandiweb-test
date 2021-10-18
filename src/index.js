import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import store, { persistor } from "./redux/store";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
