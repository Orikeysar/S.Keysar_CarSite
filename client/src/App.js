// src/App.js
import React, { useEffect, useState } from 'react';
import Layout from './components/Layout';
import Filter from './components/Filter';
import { getCars } from './services/carService';
import CarItem from './components/CarItem';
function App() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const cars = await getCars();
    setCars(cars);
    setFilteredCars(cars); // Initialize filtered cars with all cars
  };


  const handleFilter = ({ kind, maxPrice, maxKilometer, maxYear }) => {
    let filtered = cars;

    if (kind) {
      filtered = filtered.filter(car => car.kind === kind);
    }

    if (maxPrice) {
      filtered = filtered.filter(car => car.price <= maxPrice);
    }

    if (maxKilometer) {
      filtered = filtered.filter(car => car.kilometer <= maxKilometer);
    }

    if (maxYear) {
      filtered = filtered.filter(car => car.year <= maxYear);
    }

    setFilteredCars(filtered);
  };

  return (
// בתוך הקומפוננטה הקיימת להצגת הרכבים
<Layout>
  <div className="text-center">
    <Filter onFilter={handleFilter} />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {filteredCars.map((car) => (
        <CarItem key={car._id} car={car} />
      ))}
    </div>
  </div>
</Layout>
  );
}

export default App;
