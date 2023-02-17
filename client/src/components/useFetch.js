import { useState, useEffect } from "react";

export default function useFetch(url, options={}, dependencies=[]) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  async function startLoading() {
    try {
      let res = await fetch(url, options);
      let newData = await res.json();
      setData(newData.data);
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }
  useEffect(() => {
    startLoading();
  }, dependencies);

  return {
    data,
    loading,
    error,
  };
}
