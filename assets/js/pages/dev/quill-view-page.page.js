parasails.registerPage('quill-view-page', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    // content: 'This is also content'
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {

    console.log('At quill-view-page.page.js:beforeMount()');
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },

  mounted: async function(){
    console.log('At quill-view-page.page.js:mounted()');

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

      <!--quill.setContents(JSON.parse(< %=content% >));-->

      // Store accumulated changes

}

  }
});
