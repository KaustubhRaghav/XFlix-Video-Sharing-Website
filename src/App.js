import "./App.css";
import Homepage from "./components/jsx/Homepage";
import VideoPlayerPage from "./components/jsx/VideoPlayerPage"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" children={<Homepage />} />
        <Route exact path="/video/:id" render={() => (
          <VideoPlayerPage key={parseInt(Math.random()*1000)} />
        )} />
      </Switch>
    </Router>
  );
}

export default App;
