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
  data: () => ({
    quill: null,
    status: 'saved',
    change: null,
    saveTimer: null
  }),

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
  // beforeMount: function() { },

  mounted () {
    this.initializeComponent();

    // Save periodically
    this.saveTimer = setInterval(this.save, this.saveInterval);

    // Check for unsaved data on leaving page
    window.addEventListener('beforeunload', this.beforePageExit)
  },

  beforeDestroy () {
    window.removeEventListener('beforeunload', this.beforePageExit)
    clearInterval(this.saveTimer)
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    initializeComponent () {
      console.log('quill.component.js:_initialize()');
      var Delta = Quill.import('delta');

      this.quill = new Quill(this.$refs.editor, {
        modules: {
          toolbar: this.showToolbar
        },
        placeholder: this.placeholder,
        theme: this.theme
      });

      console.log('this.value: ', this.value);
      if (this.value.content) {
        this.quill.setContents(this.value.content);
      }

      this.change = new Delta();
      this.quill.on('text-change', this.onChange);
    },

    onChange (delta) {
      this.change = this.change.compose(delta);
      this.status = 'dirty'
      this.value.content = this.quill.getContents()
      this.$emit('input', this.value)
    },

    save () {
      if (this.change.length() < 1) {
        return
      }

      console.log('Saving changes', {
        change: this.change,
        pageId: this.value.pageId
      });

      // Send entire document
      this.status = 'saving'
      $.post('/api/v1/quill/update', {
        content: JSON.stringify(this.quill.getContents()),
        pageId: this.value.pageId,
        _csrf: window.SAILS_LOCALS._csrf
      }, () => {
        this.status = 'saved'
        var Delta = Quill.import('delta');
        this.change = new Delta();
      });
    },

    beforePageExit (e) {
      if (this.change.length() > 0) {
        e.preventDefault()
        e.returnValue = 'Er zijn wijzigingen die nog niet opgeslagen zijn. Weet u zeker dat u deze pagina wilt sluiten?';
      }
    }
  }
});
