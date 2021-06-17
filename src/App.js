import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { isAdminLogin } from "./features/Auths/authsSlice";
import Player from "./features/Player";
import PlayerQueue from "./features/PlayerQueue";
import "./index.css";
import Main from "./layouts/Main";
import "./scss/base.scss";
function App() {
  const [displaySidebar, setDisplaySidebar] = useState(false);
  const dispatch = useDispatch();
  const toggleSidebar = () => {
    setDisplaySidebar(!displaySidebar);
  };
  const auths = useSelector((state) => state.auths);
  const { authenticate } = auths;
  useEffect(() => {
    if (authenticate) {
      dispatch(isAdminLogin());
    }
  }, [dispatch, authenticate]);
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
