import React, { useEffect, useState } from "react";
const getQuotes = () => fetch("/quotes");
const MainPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getQuotes()
      .then((res) => res.json())
      .then((data) => setQuotes(data))
      .finally(() => setIsLoading(false));
  }, []);
  return (
    <>
      <h1 role="heading">simpson quotes</h1>;{isLoading && <p>Loading...</p>}
      <ul>
        {quotes.map(({ quote }) => (
          <li key={quote}>{quote}</li>
        ))}
      </ul>
    </>
  );
};

export default MainPage;
