import Header from "./components/Header";
import Player from "./features/Player";
import PlayerQueue from "./features/PlayerQueue";
import Main from "./layouts/Main";
import "./scss/base.scss";
function App() {
  return (
    <div className="app">
      <Header />
      <Main />
      <Player />
      <PlayerQueue />
    </div>
  );
}

export default App;
