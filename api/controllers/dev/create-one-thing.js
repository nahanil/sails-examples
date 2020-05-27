module.exports = {


  friendlyName: 'Create one more thing',


  description: '',


  inputs: {

    createThingFormData: {
      type: 'string'
    },

    createThingFormErrors: {
      type: 'string'
    },

    createThingFormRules: {

      type: 'string',
      thingName: { required: true },
    }

  },


  exits: {

  },


  fn: async function (inputs) {

    console.log(inputs.thingName);

    return;

  }


};
