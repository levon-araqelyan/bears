import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import store from "../../store/store";
import Content from "../Content/Content";
import BeerHeader from "../BeerHeader/BeerHeader";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <BeerHeader />
        <Content />
      </Router>
    </Provider>
  );
};

export default App;
