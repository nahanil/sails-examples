module.exports = {
  friendlyName: 'View dropdown-as-select page',
  description: 'View dropdown-as-select page',

  exits: {
    success: {
      viewTemplatePath: 'pages/example/dropdown-as-select',
      description: 'Display dropdown-as-select-page.'
    },
  },

  fn: async function () {
    const carBrands = ["Audi", "BMW", "Volvo", "Saab"];
    const fruitTypes = ["Banana", "Apple", "Kiwi", "Orange"];
    let selectedCar = selectedFruit = '';

    return {
      carBrands,
      fruitTypes,
      selectedCar,
      selectedFruit,
    };
  }
};
