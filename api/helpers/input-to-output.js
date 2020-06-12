module.exports = {

  friendlyName: 'Input to output',

  description: 'Maps some input to some output',

  extendedDescription: '',

  inputs: {

    value: {
      description: 'The input value to be mapped.',
      type: 'string',
      required: true,
    }
  },

  exits: {

    success: {

      outputDescription: 'Some output.',
      outputType: {
        logo: 'string'
      }
    }

  },

  fn: async function({value}) {

    console.log('inputs.medium: ' + value);

    switch (value) {
      case 'someInput':
        return 'someOutput';
      case 'otherInput':
        return 'otherOutput';
      default:
        return 'could not find a match';
    }

    // All done!
    return result;

  }

};
