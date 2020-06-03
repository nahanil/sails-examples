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

    var carBrands = ["Audi", "BMW", "Volvo", "Saab"];

    var fruitTypes = ["Banana", "Apple", "Kiwi", "Orange"];

    return {
      carBrands: carBrands,
      fruitTypes: fruitTypes
    };

  }


};
