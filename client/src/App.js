import "./App.css";
import logo from "./logo.svg";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Launches from "./components/Launches";
import MissionKey from "./components/MenuKey";
import Launch from "./components/Launch";
import { BrowserRouter as Router, Route } from "react-router-dom";
const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <img
            src={logo}
            alt=""
            style={{ width: 300, display: "block", margin: "auto" }}
          />
          <h1 className="display-4 my-4">Launches</h1>
          <MissionKey />
          <Route exact path="/" component={Launches} />
          <Route exact path="/launch/:flight_number" component={Launch} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
