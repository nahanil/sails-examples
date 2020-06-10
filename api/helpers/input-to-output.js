module.exports = {

  friendlyName: 'Input to output',

  description: 'Maps some input to some output',

  extendedDescription: '',

  inputs: {

    something: {
        type: 'string'
      },

    value: {
      description: 'The input value to be mapped.',
      type: 'string',
      required: true,
    }
  },

  exits: {

    success: {
      output: {
        type: 'string'
      },
    }

  },

  fn: async function({inputs, exits}) {

    console.log('inputs.medium: ' + inputs.something);

    switch (inputs.something) {
      case 'someInput':
        return 'someOutput';
      case 'otherInput':
        return 'otherOutput';
      default:
        return 'undefined.jpg';
    }

    // All done!
    return exits.success(result);

  }

};
