/**
 * <quill-editor>
 * -----------------------------------------------------------------------------
 * A button with a built-in loading spinner.
 *
 * @type {Component}
 *
 * @event click   [emitted when clicked]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('quill-editor', {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: {
    value: {
      type: Object
    },
    pageId: {
      type: String
    }
  },

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function (){

    return {
      //…
      // content: 'This was defined in quill.component.js:data()',

    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
        <div>
            <div id="quillArea" class="ql-editor" style="min-height:300px"/>
            <textarea style="display:none" id="hiddenArea" name="content"></textarea>
            <br/>

            <div class="row">
                <div class="col-1">Status:</div>
                <div id="statusArea" class="col-1 text-center alert-success">Saved</div>
            </div>
        </div>
  `,

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    //…

  },
  mounted: async function(){
    //…

    this._initializeComponent();
    // setData();

  },
  beforeDestroy: function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    click: async function(){
      this.$emit('click');
    },

    _initializeComponent: function () {
      console.log('quill.component.js:_initialize()');

      var Delta = Quill.import('delta');

      var quill = new Quill('#quillArea', {
        modules: {
          toolbar: true
        },
        placeholder: 'Your text goes here.',
        theme: 'snow'
      });

      var change = new Delta();
      quill.on('text-change', function(delta) {
        change = change.compose(delta);

        $('#statusArea').text("Modified");
        $('#statusArea').removeClass("alert-success");
        $('#statusArea').addClass("alert-warning");

      });

      console.log('this.content: ' + this.value.content);
      if (this.value.content)
      {
        quill.setContents(this.value.content);
      }

      // Save periodically
      setInterval(function()
      {
        if (change.length() > 0)
        {
          console.log('Saving changes', change);

          // Send partial changes
          /*
          $.post('/api/v1/quill/update', {
            partial: JSON.stringify(change)
          });
          */

          console.log('pageId: ' + this.pageId);

          // Send entire document
          $.post('/api/v1/quill/update', {
            content: JSON.stringify(quill.getContents()),
            pageId: '1',
            _csrf: window.SAILS_LOCALS._csrf
          });
          $('#statusArea').text("Saved");
          $('#statusArea').removeClass("alert-warning");
          $('#statusArea').addClass("alert-success");

          change = new Delta();
        }
      }, 5*1000);

      // Check for unsaved data
      window.onbeforeunload = function() {
        if (change.length() > 0) {
          return 'Er zijn wijzigingen die nog niet opgeslagen zijn. Weet u zeker dat u deze pagina wilt sluiten?';
        }
      }
    }
  }
});
