import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import AddCarForm from './AddCarForm';
import Filter from './Filter';
import { getCars, addCar, deleteCar } from '../services/carService';
import { useNavigate } from 'react-router-dom';
import CarItem from './CarItem';

function AdminAddCars() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const cars = await getCars();
    setCars(cars);
    setFilteredCars(cars);
  };

  const handleAddCar = async (formData) => {
    await addCar(formData);
    fetchCars();
  };

  const handleDeleteCar = async (id) => {
    await deleteCar(id);
    fetchCars();
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

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <Layout>
      <div className="text-center">
        <h2 className="text-3xl mb-4">פורמט הוספת ומחיקת רכבים</h2>
        <button onClick={handleLogout} className="p-2 bg-red-500 text-white rounded mb-4">
          Logout
        </button>
        <AddCarForm onAdd={handleAddCar} />
        <Filter onFilter={handleFilter} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {filteredCars.map((car) => (
            <CarItem key={car._id} car={car} handleDeleteCar={handleDeleteCar} />
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default AdminAddCars;