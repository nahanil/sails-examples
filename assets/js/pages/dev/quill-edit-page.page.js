parasails.registerPage('quill-edit-page', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    // Will get set by the `_.extend(...)` in beforeMount
    // needed for "reactivty" - so that this will magically
    // know when `this.quill` changed in the editor component (cuz it calls $emit('input') on change)
    quill: null,
    debug: false
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    console.log('At quill-edit-page.page.js:beforeMount()');
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },

  mounted: async function () {
    console.log('At quill-edit-page.page.js:mounted()');

    this._initiate();
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    _initiate: function () {

      // <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
      // <script src="/dependencies/jquery.min.js"></script>

      console.log('At quillpage.page.js:initiate()');

      // var quill = require("quill").Quill;

      // $('#quillArea').val('');

      // Store accumulated changes

    }

  }
});
