import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [inputVal, setInputVal] = useState('greet welcome');
  const [responseData, setResponseData] = useState(''); // To store the response from the server

  const handleAsk = async () => {
    try {
      // Include the full URL with http://
      // let response = await axios.get('http://localhost:3006/api/question', {
      //   params: { question: inputVal }, // Pass the question as query params
      // });
      let response = await axios.post('http://localhost:3006/api/question', {
        question: inputVal, // Sending question in the body
      });

      console.log(response.data.result); // Assuming result contains the response text
      setResponseData(response.data.result); // Store the result in state
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <h2>Ask anything</h2>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <button onClick={handleAsk}>Ask</button>
      </div>
      <div>
        <h2>Answer</h2>
        {/* Show the response from the server */}
        <p>{responseData}</p>
      </div>
    </>
  );
}

export default App;
