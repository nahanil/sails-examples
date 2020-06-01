module.exports = {

  friendlyName: 'View devpage',

  description: 'Display the devpage.',

  exits: {

    success: {
      description: 'Showing the default devpages.',
      viewTemplatePath: 'pages/dev/devpage'
    },

  },

  fn: async function () {


    // success
    return {
    };

  }

};
