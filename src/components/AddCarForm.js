import React, { useState, useEffect } from 'react';
import carData from '../Data/carData.json'; // Assuming you have the car data in a JSON file

const AddCarForm = ({ onAdd }) => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [kilometer, setKilometer] = useState('');
  const [description, setDescription] = useState('');
  const [hand, setHand] = useState('');
  const [error, setError] = useState('');
  const [kind, setKind] = useState('');
  const [images, setImages] = useState([]);
  const [isElectric, setIsElectric] = useState(false);

  const carMakes = Object.keys(carData);

  useEffect(() => {
    if (make) {
      setModel('');
    }
  }, [make]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!make || !model || !year || !price || !kilometer || !description || !hand || !kind) {
      setError('נא מלא את כל הפרמטרים');
      return;
    }
    const formData = new FormData();
    formData.append('make', make);
    formData.append('model', model);
    formData.append('year', year);
    formData.append('price', price);
    formData.append('kilometer', kilometer);
    formData.append('description', description);
    formData.append('hand', hand);
    formData.append('kind', kind);
    formData.append('isElectric', isElectric);
    images.forEach((image, index) => {
      formData.append('images', image);
    });

    onAdd(formData);
    setMake('');
    setModel('');
    setYear('');
    setPrice('');
    setKilometer('');
    setDescription('');
    setHand('');
    setError('');
    setKind('');
    setImages([]);
    setIsElectric(false);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-center">שם יצרן רכב</label>
          <select
            value={make}
            onChange={(e) => setMake(e.target.value)}
            className="p-2 border rounded w-full text-center"
          >
            <option value="">בחר יצרן רכב</option>
            {carMakes.map((make) => (
              <option key={make} value={make}>{make}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-center">דגם</label>
          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="p-2 border rounded w-full text-center"
            disabled={!make}
          >
            <option value="">בחר דגם רכב</option>
            {make && carData[make].map((model) => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-center">סוג רכב</label>
          <select
            value={kind}
            onChange={(e) => setKind(e.target.value)}
            className="p-2 border rounded w-full text-center"
          >
            <option value="">בחר סוג רכב</option>
            <option value="קרוסוברים">קרוסוברים</option>
            <option value="משפחתיים">משפחתיים</option>
            <option value="ג'יפים">ג'יפים</option>
            <option value="קטנים">קטנים</option>
            <option value="מנהלים">מנהלים</option>
            <option value="+מקומות 7">+מקומות 7</option>
          </select>
        </div>
        <div>
          <label className="block text-center">שנה</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="p-2 border rounded w-full text-center"
          />
        </div>
        <div>
          <label className="block text-center">מחיר</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-2 border rounded w-full text-center"
          />
        </div>
        <div>
          <label className="block text-center">קילומטר</label>
          <input
            type="number"
            value={kilometer}
            onChange={(e) => setKilometer(e.target.value)}
            className="p-2 border rounded w-full text-center"
          />
        </div>
        <div>
          <label className="block text-center">יד</label>
          <input
            type="number"
            value={hand}
            onChange={(e) => setHand(e.target.value)}
            className="p-2 border rounded w-full text-center"
          />
        </div>
        <div>
          <label className="block text-center">תיאור קצר על הרכב</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border rounded w-full text-center"
          />
        </div>
        <div>
          <label className="block text-center">העלה תמונות (עד 5)</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="p-2 border rounded w-full text-center"
            accept="image/*"
          />
        </div>
        <div className="flex items-center justify-center">
          <input
            type="checkbox"
            checked={isElectric}
            onChange={(e) => setIsElectric(e.target.checked)}
            className="mr-2"
          />
          <label className="block">רכב חשמלי</label>
        </div>
      </div>
      <button type="submit" className="p-2 bg-blue-500 text-white rounded w-full">
        Add Car
      </button>
    </form>
  );
};

export default AddCarForm;
