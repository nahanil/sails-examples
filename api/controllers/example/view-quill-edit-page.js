module.exports = {

  friendlyName: 'View quillpage',

  description: 'Display the quillpage.',

  exits: {

    success: {
      description: 'Showing the quill page.',
      viewTemplatePath: 'pages/example/quill-edit-page'
    },

  },

  fn: async function () {

    var quill = await Quill.findOne( { pageId:'1' } );

    console.log('quill.content: '+ quill.content);

    if (!quill) {
      quill = { content: 'This content was added because _none_ was returned from the datastore.'};
    }

    // This kinda smells.. Maybe use waterline's `json` type & `ref` in your 'update-the-thing' action
    quill.content = JSON.parse(quill.content || '')

    // success
    return {
      quill: quill,
    };

  }

};
