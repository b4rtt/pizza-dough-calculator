export const recipes = {
  neapolitan: {
    name: 'Neapolitan',
    number: 4,
    gramsPerPizza: 230,
    waterShare: 65,
    saltPercentage: 0.0178261,
    oilPercentage: 0,
    sugarPercentage: 0,
    semolinaPercentage: 0,
    yeast: { fresh: 0.00119565217391304, dry: 0.00043478260869565 }
  },
  'new-york': {
    name: 'New York',
    number: 4,
    gramsPerPizza: 230,
    waterShare: 63,
    saltPercentage: 0.0118478,
    sugarPercentage: 0.0036,
    oilPercentage: 0.0177173913,
    semolinaPercentage: 0,
    yeast: { fresh: 0.005, dry: 0.0016667 }
  },
  pan: {
    name: 'Pan',
    number: 3,
    gramsPerPizza: 230,
    waterShare: 65,
    saltPercentage: 0.011682893,
    sugarPercentage: 0.011682893,
    oilPercentage: 0.0139082058,
    semolinaPercentage: 0,
    yeast: { fresh: 0.002364394993045897, dry: 0.00097357441 }
  },
  sicilian: {
    name: 'Sicilian',
    number: 1,
    gramsPerPizza: 271,
    waterShare: 66,
    saltPercentage: 0.01107,
    sugarPercentage: 0.01107,
    oilPercentage: 0.02583,
    semolinaPercentage: 0.22,
    yeast: { fresh: 0.008118081, dry: 0.00332103321 }
  }
};

export function calculateTotals({ recipeKey, pizzas, gramsPerPizza, yeastType }) {
  const recipe = recipes[recipeKey];
  const total = pizzas * gramsPerPizza;
  const salt = Math.round(total * recipe.saltPercentage);
  const yeast = Math.round(total * recipe.yeast[yeastType]);
  const oil = recipe.oilPercentage ? Math.round(total * recipe.oilPercentage) : 0;
  const sugar = recipe.sugarPercentage ? Math.round(total * recipe.sugarPercentage) : 0;
  const net = total - salt - yeast - oil - sugar;
  const flourWithSemolina = Math.round(net / (1 + recipe.waterShare / 100));
  const semolina = recipe.semolinaPercentage ? Math.round(flourWithSemolina * recipe.semolinaPercentage) : 0;
  const flour = flourWithSemolina - semolina;
  const water = Math.round(flourWithSemolina * recipe.waterShare / 100);
  return { total, flour, water, salt, yeast, oil, sugar, semolina };
}
