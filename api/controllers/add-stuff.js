module.exports = {
  friendlyName: 'Do some stuff',
  description: 'Do some stuff with the form data.',

  inputs: {

    input1: {
      description: 'The first input.',
      required: true,
      type: 'string'
    }

  },

  fn: async function (inputs, exits) {

    console.log('at the server side where we do stuff with the first input');
    // Do some stuff with the inputs
    return exits.success();

  }
};
