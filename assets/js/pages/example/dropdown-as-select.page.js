parasails.registerPage('dropdown-as-select', {
  data: {
    // These should be overridden in beforeMount with stuff from the backend "action"
    // but on the off chance the API doesn't give us them....
    carBrands: [],
    fruitTypes: [],
    selectedCar: null,
    selectedFruit: null,
    selectedCountry: null
  },

  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },

  methods: {
  }
})
