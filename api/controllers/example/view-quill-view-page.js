module.exports = {

  friendlyName: 'View quillviewpage',

  description: 'Display the quillpage.',

  exits: {

    success: {
      description: 'Showing the quill page.',
      viewTemplatePath: 'pages/example/quill-view-page'
    },

  },

  fn: async function () {

    var quill = await Quill.findOne( { pageId:'1' } );

    console.log('quill.content: '+ quill.content);

    if (quill === 'undefined')
    {
      quill = { content: 'This content was added because _none_ was returned from the datastore.'};
    }

    // success
    return {
      content: quill.content
    };

  }

};
