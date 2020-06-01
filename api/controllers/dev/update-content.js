module.exports = {

  friendlyName: 'Saving Quill content',

  description: 'Saving Quill content.',


  inputs: {

    content: {
      description: 'Content to be updated.',
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

    console.log("updating content with: "+inputs.content)

    // Update the content
    await Quill.update( {pageId: '1'} )
    .set({
      content: inputs.content
    });

  }


};
