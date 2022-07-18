import * as React from 'react';
import './style.css';

export default function App() {
  const [data, setData] = React.useState({ data: [] });
  const [isLoading, setIsLoading] = React.useState(false);
  const [err, setErr] = React.useState('');

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('https://reqres.in/api/users', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      console.log('result is: ', JSON.stringify(result, null, 4));

      setData(result);
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(data);

  return (
    <div>
      <div>
        {err && <h2>{err}</h2>}

        <button onClick={handleClick}>Fetch data</button>

        {isLoading && <h2>Loading...</h2>}

        {data.data.map((person) => {
          return (
            <div key={person.id}>
              <h2>{person.email}</h2>
              <h2>{person.first_name}</h2>
              <h2>{person.last_name}</h2>
              <br />
            </div>
          );
        })}
      </div>
    </div>
  );
}
