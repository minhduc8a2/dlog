import Main from "./components/main";
import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import Animation from "./components/animation";
import apiURL from "./components/api";
function App() {
  useEffect(() => {
    async function updateVisits() {
      await fetch(apiURL.updateVisits, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      console.log("fetched Visits");
    }

    updateVisits();
  }, []);

  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

export default App;
