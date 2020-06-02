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
  props: [
    'content'
  ],

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
        placeholder: 'Compose an epic...',
        theme: 'snow'
      });

      var change = new Delta();
      quill.on('text-change', function(delta) {
        change = change.compose(delta);
      });

      console.log("this.content: "+this.content);
      quill.setContents(JSON.parse(this.content));
      // quill.setContents(this.content);

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

          // Send entire document
          $.post('/api/v1/quill/update', {
            content: JSON.stringify(quill.getContents()),
            pageId: '1'
          });

          change = new Delta();
        }
      }, 5*1000);

      // Check for unsaved data
      window.onbeforeunload = function() {
        if (change.length() > 0) {
          return 'There are unsaved changes. Are you sure you want to leave?';
        }
      }
    },

    setData: function () {

      console.log('quill.component.js:setData()');

      quill.setContents(JSON.parse(content));
      // quill.setContents('test');
    }

  }
});
