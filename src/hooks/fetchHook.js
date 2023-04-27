import { useState, useEffect } from "react";

const useFetchHook = (route) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(route);
        const data = await response.json();
        setData(data?.vans);
      } catch (errorResponse) {
        setError(errorResponse.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [route]);
  return { data, error, isLoading };
};
export default useFetchHook;
