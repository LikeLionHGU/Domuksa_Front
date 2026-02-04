import Home from "./page/Home";
import Meet from "./page/Meet";
import Archived from "./page/Archived";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element= {<Meet />} />
      <Route path="/archived" element={<Archived />} />
    </Routes>
  );
}

export default App;
