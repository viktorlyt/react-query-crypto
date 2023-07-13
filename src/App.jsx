import { useState } from "react";
import axios from "axios";
import "./App.scss";
import { useQuery } from "react-query";

async function fetchCoins(skip = 0) {
  const { data } = await axios.get(
    `https://api.coinstats.app/public/v1/coins?skip=${skip}&limit=10`
  );

  return data.coins;
}

function App() {
  const [page, setPage] = useState(0);
  const { data, isLoading, isError } = useQuery(
    ["coins", page],
    () => fetchCoins(page),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  console.log(data);
  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (isError) {
    return <h3>Error with loading data...</h3>;
  }

  if (!data) {
    return <h3>No data!</h3>;
  }

  return (
    <div className="App">
      <ul>
        {data.map((coin) => (
          <li key={coin.id}>
            <img
              src={coin.icon}
              alt="icon"
              style={{ width: "50px", height: "50px" }}
            ></img>
            - <strong> {coin.id}</strong>
             <span> ({coin.price})</span>
          </li>
        ))}
      </ul>
      <button
        className="btn btn-primary"
        onClick={() => setPage((p) => p - 10)}
        disabled={!page}
      >
        Back
      </button>
      <button
        className="btn btn-primary"
        onClick={() => setPage((p) => p + 10)}
      >
        Forward
      </button>
    </div>
  );
}

export default App;
