import { useState, useEffect } from 'react';

type FetchFunction = () => Promise<Response>;

function Fetch(fetchFunction: FetchFunction) {
  const [data, setData] = useState<any | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetchFunction();
        const jsonData = await response.json();
        setData(jsonData);
      } catch (erro) {
        if (erro instanceof Error) {
          setError(erro);
        }
      }
    }

    fetchData();
  }, [fetchFunction]);

  return { data, error };
}

export default Fetch;
