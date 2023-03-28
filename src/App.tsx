import React, { useState } from 'react';
import carsFromServer from './api/cars';
import colorsFromServer from './api/colors';

interface Cars {
  id: number,
  brand: string,
  rentPrice: number,
  colorId: number,
  color: Color | undefined,
}

interface Color {
  id: number,
  name: string,
}

export const App: React.FC = () => {
  const carWithColors: Cars[] = carsFromServer.map(car => {
    const color = colorsFromServer.find(({ id }) => id === car.colorId);

    return {
      ...car,
      color,
    };
  });

  const [query, setQuery] = useState('');

  let visibleCars = [...carWithColors];

  if (query) {
    const lowerQuery = query.toLocaleLowerCase();

    visibleCars = carWithColors
      .filter(({ brand }) => brand.toLocaleLowerCase().includes(lowerQuery));
  }

  const handleQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setQuery(event.target.value);
  };

  const [selectedColor, setSelectedColor] = useState(0);

  if (selectedColor) {
    visibleCars = carWithColors
      .filter(({ color }) => color?.id === selectedColor);
  }

  const handleColorChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setSelectedColor(+event.target.value);
  };

  return (
    <div>
      <input
        type="search"
        placeholder="Find by car brand"
        value={query}
        onChange={handleQueryChange}
      />

      <select
        value={selectedColor}
        onChange={handleColorChange}
      >
        <option>Chose a color</option>
        {colorsFromServer.map(({ name, id }) => (
          <option
            key={id}
            value={id}
          >
            {name}
          </option>
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
          {visibleCars.map(({
            id,
            brand,
            rentPrice,
            color,
          }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{brand}</td>
              <td style={{ color: `${color?.name}` }}>{color?.name}</td>
              <td>{rentPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
