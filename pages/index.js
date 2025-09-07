import { useState } from 'react';

export default function Home() {
  const [pizzas, setPizzas] = useState(2);
  const [gramsPerPizza, setGramsPerPizza] = useState(250);

  const total = pizzas * gramsPerPizza;
  const water = Math.round(total * 0.65);
  const flour = total - water;
  const salt = Math.round(total * 0.02);
  const yeast = Math.round(total * 0.005);

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Pizza Dough Calculator</h1>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Pizzas:
          <input
            type="number"
            value={pizzas}
            onChange={(e) => setPizzas(parseInt(e.target.value, 10) || 0)}
            style={{ marginLeft: '0.5rem' }}
          />
        </label>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Grams per pizza:
          <input
            type="number"
            value={gramsPerPizza}
            onChange={(e) => setGramsPerPizza(parseInt(e.target.value, 10) || 0)}
            style={{ marginLeft: '0.5rem' }}
          />
        </label>
      </div>
      <h2>Ingredients</h2>
      <ul>
        <li>Flour: {flour} g</li>
        <li>Water: {water} g</li>
        <li>Salt: {salt} g</li>
        <li>Yeast: {yeast} g</li>
      </ul>
    </main>
  );
}
