import Header from "./components/Header";
import Player from "./features/Player";
import PlayerQueue from "./features/PlayerQueue";
import Main from "./layouts/Main";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "./index.css";
import "./scss/base.scss";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
function App() {
  const [displaySidebar, setDisplaySidebar] = useState(false);
  const toggleSidebar = () => {
    setDisplaySidebar(!displaySidebar);
  };
  return (
    <div id="app" className="app">
      <Sidebar displaySidebar={displaySidebar} toggleSidebar={toggleSidebar} />
      <Header toggleSidebar={toggleSidebar} />
      <Main />
      <Player />
      <PlayerQueue />
      <ToastContainer autoClose={2000} />
    </div>
  );
}

export default App;
