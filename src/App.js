import Home from "./page/Home";
import Meet from "./page/Meet";
import Archived from "./page/Archived";
import Landing from "./page/Landing";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/landing" element= {<Landing />} />
      <Route path="/" element= {<Home />} />
      <Route path="/meet" element= {<Meet />} />
      <Route path="/archived" element={<Archived />} />
    </Routes>
  );
}

export default App;
