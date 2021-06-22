import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { isAdminLogin } from "./features/Auths/authsSlice";
import Player from "./features/Player";
import PlayerQueue from "./features/PlayerQueue";
import ScrollToTop from "./features/ScrollToTop";
import "./index.css";
import Main from "./layouts/Main";
import { setDisplayPlayerQueue } from "./pages/HomePages/displayFormSlice";
import "./scss/base.scss";
// import "sweetalert2/dist/sweetalert2.scss";
function App() {
  const dispatch = useDispatch();
  //State
  const [displaySidebar, setDisplaySidebar] = useState(false);
  //
  //Store
  const auths = useSelector((state) => state.auths);
  const displayForm = useSelector((state) => state.displayForm);
  const playerControls = useSelector((state) => state.playerControls);
  const { authenticate } = auths;
  //

  const toggleSidebar = () => {
    setDisplaySidebar(!displaySidebar);
  };
  useEffect(() => {
    if (authenticate) {
      dispatch(isAdminLogin());
    }
  }, [dispatch, authenticate]);
  //Handle stop handle refresh page when music is playing
  useEffect(() => {
    const onUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    if (playerControls.isPlaying) {
      window.addEventListener("beforeunload", onUnload);
    }
    return () => {
      window.removeEventListener("beforeunload", onUnload);
    };
  }, [playerControls.isPlaying]);
  return (
    <div id="app" className="app">
      <ScrollToTop />
      <Sidebar displaySidebar={displaySidebar} toggleSidebar={toggleSidebar} />
      <Header toggleSidebar={toggleSidebar} />
      <Main />
      <Player />
      <PlayerQueue />
      <ToastContainer autoClose={2000} />
      {displayForm.playerQueue && (
        <div
          className="app-overlay"
          onClick={() => dispatch(setDisplayPlayerQueue(false))}
        ></div>
      )}
    </div>
  );
}

export default App;
