import './App.css';
import React, { useEffect, useState } from 'react';
// import Data from './components/Data';
import Loading from './components/Loading';
import Tours from './components/Tours';
const url = 'https://course-api.com/react-tours-project';
function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  //remove tour
  const removeTour = (id) => {
    const newTour = tours.filter((tour) => tour.id !== id);

    setTours(newTour);
  }

  const fetchTours = async () => {
    setLoading(true);

    try {
      const res = await fetch(url);
      const tours = await res.json();
      // console.log(tours);
      setLoading(false);
      setTours(tours);
    }
    catch (err) {
      setLoading(false);
      console.log(err)
    }
  };
  useEffect(() => {
    fetchTours();

  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>  No Tours left </h2>
          <button className='btn' onClick={fetchTours}>Refresh</button>
        </div>
      </main>
    );
  }

  return (
    <div className='container'>
      <main>
        <Tours tours={tours} removeTour={removeTour} />
      </main>
    </div>
  );
}

export default App;
