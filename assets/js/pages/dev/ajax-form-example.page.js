parasails.registerPage('ajax-form-example', {
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    data: {

      // Main syncing/loading state for this page.
      syncing: false,

      // Form data
      formData: {
        myinputs: [
          {
            key: 'key',
            value: 'value'
          }
        ]
      },

      // For tracking client-side validation errors in our form.
      // > Has property set to `true` for each invalid property in `formData`.
      formErrors: { /* … */},

      // Server error state for the form
      cloudError: '',

      // Success state when form has been submitted
      cloudSuccess: false,

    },

    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    beforeMount: function () {
      // Attach any initial data from the server.
      _.extend(this, SAILS_LOCALS);
    },
    mounted: async function () {
    },

    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    methods: {

      addFilterForm: function () {

        this.formData.myinputs.push({
          key: 'some',
          value: 'keyvalue'
        });
      }
    }
  }
);
