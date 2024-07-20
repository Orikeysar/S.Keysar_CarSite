import React, { useState, useEffect } from 'react';
import { getCars } from './services/carService';
import CarItem from './components/CarItem';
import Filter from './components/Filter';
import Layout from './components/Layout';

const App = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const cars = await getCars();
        setCars(cars);
        setFilteredCars(cars); // Initially, set filteredCars to the full car list
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };
    fetchCars();
  }, []);

  const handleFilter = (filterCriteria) => {
    let filtered = cars;

    if (filterCriteria.kind) {
      filtered = filtered.filter(car => car.kind === filterCriteria.kind);
    }
    if (filterCriteria.maxPrice) {
      filtered = filtered.filter(car => car.price <= filterCriteria.maxPrice);
    }
    if (filterCriteria.maxKilometer) {
      filtered = filtered.filter(car => car.kilometer <= filterCriteria.maxKilometer);
    }
    if (filterCriteria.maxYear) {
      filtered = filtered.filter(car => car.year <= filterCriteria.maxYear);
    }

    setFilteredCars(filtered);
  };

  return (
    <Layout>
      <div className="text-center">
        <h2 className="text-3xl mb-4">פורמט הוספת ומחיקת רכבים</h2>
        <Filter onFilter={handleFilter} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {Array.isArray(filteredCars) && filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <CarItem key={car._id} car={car} />
            ))
          ) : (
            <p>אין מכוניות להצגה</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default App;
