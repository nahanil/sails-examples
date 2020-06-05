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

    saveInterval: {
      type: Number,
      default: 5 * 1000
    },

    placeholder: {
      type: String,
      default: 'Your text goes here.'
    },

    theme: {
      type: String,
      default: 'snow'
    },

    showToolbar: {
      type: Boolean,
      default: true
    }
  },

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function () {
    return {
      status: 'saved',
      change: null
    };
  },

  computed: {
    statusClass () {
      switch (this.status) {
        case 'saved':
          return 'badge-success'
        case 'saving':
          return 'badge-info'
        case 'dirty':
          return 'badge-warning'
      }

      return 'badge-light'
    },

    // TBH these could be like { saved: 'something', saving: 'soemthing' }
    // and passed in as a prop for i18n stuff
    statusLabel () {
      switch (this.status) {
        case 'saved':
          return 'Saved'
        case 'saving':
          return 'Saving...'
        case 'dirty':
          return 'Modified'
      }

      return '?'
    },
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
        <div>
            <div ref="editor" class="ql-editor" style="min-height:300px"/>
            <br/>

            <div>
                Status:
                <span class="badge" :class="statusClass">{{ statusLabel }}</span>
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
    this._initializeComponent();
  },

  beforeDestroy () {
    window.removeEventListener('beforeunload', this.beforePageExit)
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    _initializeComponent: function () {
      console.log('quill.component.js:_initialize()');
      var Delta = Quill.import('delta');

      var quill = new Quill(this.$refs.editor, {
        modules: {
          toolbar: this.showToolbar
        },
        placeholder: this.placeholder,
        theme: this.theme
      });

      console.log('this.value: ', this.value);
      if (this.value.content) {
        quill.setContents(this.value.content);
      }

      this.change = new Delta();
      quill.on('text-change', (delta) => {
        this.change = this.change.compose(delta);
        this.status = 'dirty'
        this.value.content = quill.getContents()
        this.$emit('input', this.value)
      });

      // Save periodically
      setInterval(() => {
        if (this.change.length() > 0) {
          console.log('Saving changes', this.change);

          // Send partial changes
          /*
          $.post('/api/v1/quill/update', {
            partial: JSON.stringify(change)
          });
          */

          console.log('pageId: ' + this.value.pageId);

          // Send entire document
          this.status = 'saving'
          $.post('/api/v1/quill/update', {
            content: JSON.stringify(quill.getContents()),
            pageId: this.value.pageId,
            _csrf: window.SAILS_LOCALS._csrf
          }, () => {
            this.status = 'saved'
          });

          this.change = new Delta();
        }
      }, this.saveInterval);

      // Check for unsaved data
      window.addEventListener('beforeunload', this.beforePageExit)
    },

    beforePageExit (e) {
      if (this.change.length() > 0) {
        e.preventDefault()
        e.returnValue = 'Er zijn wijzigingen die nog niet opgeslagen zijn. Weet u zeker dat u deze pagina wilt sluiten?';
      }
    }
  }
});
