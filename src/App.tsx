import React, { ChangeEvent, useState } from 'react';
import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';

// 2. Add ability to filter car by brand name
// 3. Add ability to filter car by color

interface Cars {
  id: number,
  brand: string,
  rentPrice: number,
  colorId: number,
  color: Colors,
}

interface Colors {
  id: number,
  name: ColorsName,
}

enum ColorsName {
  RED = 'red',
  WHITE = 'white',
  BLACK = 'black',
}

export const App: React.FC = () => {
  const carsWithColor: Cars[] = carsFromServer.map(car => {
    const color = colorsFromServer.find(({ id }) => car.colorId === id);

    return {
      ...car,
      color,
    };
  });

  const handleBrand = (event: ChangeEvent<HTMLInputElement>): void => {
    setCarBrand(event.currentTarget.value)
  };

  const [carBrand, setCarBrand] = useState(cars);

  return (
    <div>
      <input
        type="search"
        placeholder="Find by car brand"
        value={carBrand}
        onChange={handleBrand}
      />

      <select>
        <option disabled>Chose a color</option>
        {Object.values(ColorsName).map(color => (
          <option value="">{color}</option>
        ))}
      </select>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Brand</th>
            <th>Color</th>
            <th>Rent price</th>
          </tr>
        </thead>
        <tbody>
          {carsWithColor.map(car => (
            <tr key={car.id}>
              <td>{car.id}</td>
              <td>{car.brand}</td>
              <td style={{ color: `${car.color?.name}` }}>
                {car.color?.name}
              </td>
              <td>{car.rentPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
