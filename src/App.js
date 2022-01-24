import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home";
import Ranking from "./pages/Ranking";
import Success from "./pages/Success";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/:id" element={<Home/>}/>
      <Route path="/success/:id" element={<Success/>}/>
      <Route path="/ranking" element={<Ranking/>}/>
    </Routes>
  );
}

export default App;
