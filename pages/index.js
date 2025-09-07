import { useState } from 'react';
import { recipes, calculateTotals } from '../lib/recipes';

export default function Home() {
  const [recipeKey, setRecipeKey] = useState('neapolitan');
  const [yeastType, setYeastType] = useState('fresh');
  const [pizzas, setPizzas] = useState(recipes[recipeKey].number);
  const [gramsPerPizza, setGramsPerPizza] = useState(recipes[recipeKey].gramsPerPizza);

  const totals = calculateTotals({ recipeKey, pizzas, gramsPerPizza, yeastType });

  const handleRecipeChange = (e) => {
    const key = e.target.value;
    setRecipeKey(key);
    setPizzas(recipes[key].number);
    setGramsPerPizza(recipes[key].gramsPerPizza);
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Pizza Dough Calculator</h1>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Pizza type:
          <select value={recipeKey} onChange={handleRecipeChange} style={{ marginLeft: '0.5rem' }}>
            {Object.entries(recipes).map(([key, r]) => (
              <option key={key} value={key}>{r.name}</option>
            ))}
          </select>
        </label>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Yeast type:
          <select value={yeastType} onChange={(e) => setYeastType(e.target.value)} style={{ marginLeft: '0.5rem' }}>
            <option value="fresh">Fresh</option>
            <option value="dry">Dry</option>
          </select>
        </label>
      </div>
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
        <li>Flour: {totals.flour} g</li>
        <li>Water: {totals.water} g</li>
        <li>Salt: {totals.salt} g</li>
        <li>Yeast ({yeastType}): {totals.yeast} g</li>
        {totals.sugar ? <li>Sugar: {totals.sugar} g</li> : null}
        {totals.oil ? <li>Oil: {totals.oil} g</li> : null}
        {totals.semolina ? <li>Semolina: {totals.semolina} g</li> : null}
      </ul>
    </main>
  );
}
