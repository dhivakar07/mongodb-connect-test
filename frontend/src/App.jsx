import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [entValue, setentValue] = useState("");
  const [fruits, setfruits] = useState([]);

  const handleChange = (event) => {
    setentValue(event.target.value);
  };

  useEffect(() => {
    axios.get("http://localhost:3000/fruitsdata").then((response) => {
      setfruits(response.data);
    });
  }, []);

  const handleAdd = () => {
    axios.post("http://localhost:3000/addfruit", { newfruit: entValue });
    setfruits([...fruits, { name: entValue }]);
    setentValue("");
  };

  return (
    <>
      <input onChange={handleChange} value={entValue} />
      <button onClick={handleAdd}>Add</button>
      {fruits.map((item, index) => {
        return <p key={index}>{item.name}</p>;
      })}
    </>
  );
}

export default App;
