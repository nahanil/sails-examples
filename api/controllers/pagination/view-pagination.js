module.exports = {

  friendlyName: 'View pagination',

  description: 'Display the pagination page.',

  exits: {

    success: {
      description: 'Showing the default devpages.',
      viewTemplatePath: 'pages/pagination/pagination'
    },

  },

  fn: async function () {

    var response = await Todo.find();

    console.log('response: '+response);
    // await NewsItem.find({status: 'approved'}).sort('approvalDate DESC').populate('submittedBy');

    // const response = await Api().get('todos', { params: { 'skip': ( context.state. page-1 ) *10, 'limit': 10 }})

    // success
    return {
      todos: response,
      page: 1,
      rows: 0,
      perpage: 0,
    };

  }

};
