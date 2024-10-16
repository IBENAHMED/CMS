"use client"; // This directive enables client-side rendering

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data function
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:1337/api/home-page");
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const json = await res.json();
      setData(json.data); // Assuming your API returns { data: { title, description } }
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchData();

    // Optional: Set up an interval to refetch data periodically (e.g., every 5 seconds)
    const interval = setInterval(() => {
      fetchData();
    }, 5000); // Adjust the interval as needed

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Handle loading and error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Render the data
  const { title, description }: any = data;

  return (
    <>
      <h1>{title}</h1>
      <p>{description}</p>
    </>
  );
}
