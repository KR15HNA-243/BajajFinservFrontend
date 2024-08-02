import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [sections, setSections] = useState({
    characters: true,
    numbers: true,
    highestAlphabet: true,
  });

  const handleSubmit = async () => {
    try {
      const res = await axios.post('https://<your-backend-endpoint>/bfhl', { data: JSON.parse(jsonInput) });
      setResponse(res.data);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div className="App">
      <h1>ABCD123</h1>
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Enter JSON"
      />
      <button onClick={handleSubmit}>Submit</button>

      {response && (
        <>
          <div>
            <input
              type="checkbox"
              checked={sections.characters}
              onChange={() => setSections({ ...sections, characters: !sections.characters })}
            />
            Characters
            <input
              type="checkbox"
              checked={sections.numbers}
              onChange={() => setSections({ ...sections, numbers: !sections.numbers })}
            />
            Numbers
            <input
              type="checkbox"
              checked={sections.highestAlphabet}
              onChange={() => setSections({ ...sections, highestAlphabet: !sections.highestAlphabet })}
            />
            Highest Alphabet
          </div>
          {sections.characters && (
            <div>
              <h2>Characters</h2>
              <pre>{JSON.stringify(response.alphabets, null, 2)}</pre>
            </div>
          )}
          {sections.numbers && (
            <div>
              <h2>Numbers</h2>
              <pre>{JSON.stringify(response.numbers, null, 2)}</pre>
            </div>
          )}
          {sections.highestAlphabet && (
            <div>
              <h2>Highest Alphabet</h2>
              <pre>{JSON.stringify(response.highest_alphabet, null, 2)}</pre>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
