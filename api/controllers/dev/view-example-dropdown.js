module.exports = {

  friendlyName: 'View devpage',

  description: 'Display the devpages.',

  exits: {

    success: {
      description: 'Showing the default devpages.',
      viewTemplatePath: 'pages/example/dropdown_as_select'
    },

  },

  fn: async function () {

    // success
    return {};

  }


};
