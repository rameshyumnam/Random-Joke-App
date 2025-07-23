import React, { useState, useEffect } from 'react';
import "./App.css";

const App = () => {
  const [randomJoke, setRandomJoke] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getRandomJoke();
  }, [])

  const getRandomJoke = async () => {
    setIsLoading(true);

    const url = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,explicit&type=single";

    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      const joke = jsonData.joke;
      setRandomJoke(joke);
    } catch (err) {
      console.log("Error Fetching joke: ", err)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className='bg-container'>
      <h1>Random Jokes Page</h1>
      <div className="image">
        <img src="/public/joke emoji.png" alt="" />
      </div>

      {isLoading ? (
        <div className='loader' id='spinner'></div>
      ) : (
        <p className='joke-text'>"{randomJoke}"</p>
      )}

      <button type='button' id='random-joke-btn' onClick={getRandomJoke}>New Joke</button>
    </div>
  )
}

export default App
