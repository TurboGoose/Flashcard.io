import {useState} from "react";
import DeckFilter from "./components/DeckFilter";

function App() {
    const [filter, setFilter] = useState({sort: "", searchQuery: ""})

    return (
        <div className="App">
            <DeckFilter filter={filter} setFilter={setFilter}/>
        </div>
  );
}

export default App;
