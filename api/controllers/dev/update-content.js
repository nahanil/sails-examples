module.exports = {

  friendlyName: 'Saving Quill content',

  description: 'Saving Quill content.',


  inputs: {

    content: {
      description: 'Content to be updated.',
      type: 'string',
      required: true
    },

    pageId: {
      description: 'The pageId to be updated',
      type: 'string',
      required: true
    }

  },

  exits: {

    success: {
      statusCode: 200,
      description: 'Quill content saved to datastore.',
    },
  },


  fn: async function (inputs) {

    console.log('updating content with: ' + inputs.content + ' for page ' + inputs.pageId);

    // Update the content
    await Quill.update( {pageId: inputs.pageId} )
    .set({
      content: inputs.content
    });

  }


};
