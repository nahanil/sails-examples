/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function() {

  // Import dependencies
  var path = require('path');

  // This bootstrap version indicates what version of fake data we're dealing with here.
  var HARD_CODED_DATA_VERSION = 0;

  // This path indicates where to store/look for the JSON file that tracks the "last run bootstrap info"
  // locally on this development computer (if we happen to be on a development computer).
  var bootstrapLastRunInfoPath = path.resolve(sails.config.appPath, '.tmp/bootstrap-version.json');

  // Whether or not to continue doing the stuff in this file (i.e. wiping and regenerating data)
  // depends on some factors:
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // If the hard-coded data version has been incremented, or we're being forced
  // (i.e. `--drop` or `--environment=test` was set), then run the meat of this
  // bootstrap script to wipe all existing data and rebuild hard-coded data.
  if (sails.config.models.migrate !== 'drop' && sails.config.environment !== 'test') {
    // If this is _actually_ a production environment (real or simulated), or we have
    // `migrate: safe` enabled, then prevent accidentally removing all data!
    if (process.env.NODE_ENV==='production' || sails.config.models.migrate === 'safe') {
      sails.log('Since we are running with migrate: \'safe\' and/or NODE_ENV=production (in the "'+sails.config.environment+'" Sails environment, to be precise), skipping the rest of the bootstrap to avoid data loss...');
      return;
    }//•

    // Compare bootstrap version from code base to the version that was last run
    var lastRunBootstrapInfo = await sails.helpers.fs.readJson(bootstrapLastRunInfoPath)
    .tolerate('doesNotExist');// (it's ok if the file doesn't exist yet-- just keep going.)

    if (lastRunBootstrapInfo && lastRunBootstrapInfo.lastRunVersion === HARD_CODED_DATA_VERSION) {
      sails.log('Skipping v'+HARD_CODED_DATA_VERSION+' bootstrap script...  (because it\'s already been run)');
      sails.log('(last run on this computer: @ '+(new Date(lastRunBootstrapInfo.lastRunAt))+')');
      return;
    }//•

    sails.log('Running v'+HARD_CODED_DATA_VERSION+' bootstrap script...  ('+(lastRunBootstrapInfo ? 'before this, the last time the bootstrap ran on this computer was for v'+lastRunBootstrapInfo.lastRunVersion+' @ '+(new Date(lastRunBootstrapInfo.lastRunAt)) : 'looks like this is the first time the bootstrap has run on this computer')+')');
  }
  else {
    sails.log('Running bootstrap script because it was forced...  (either `--drop` or `--environment=test` was used)');
  }

  // Since the hard-coded data version has been incremented, and we're running in
  // a "throwaway data" environment, delete all records from all models.
  for (let identity in sails.models) {
    await sails.models[identity].destroy({});
  }//∞

  // By convention, this is a good place to set up fake data during development.
  await User.createEach([
    { emailAddress: 'admin@test.dk', fullName: 'Ryan Dahl', isSuperAdmin: true, password: await sails.helpers.passwords.hashPassword('321') },
  ]);

  await Quill.createEach([
    {pageId: '1', content: JSON.stringify({ops:[{"insert":"\n"}]})},
    {pageId: '2', content: JSON.stringify({ops:[{"insert":"This is nice"}]})},
    ]);

  var result_apple_24 = { 'fruit': 'Apple', 'juiciness': 1, 'color': 5, 'taste': 29, 'texture': 2};
  var result_apple_23 = { 'fruit': 'Apple', 'juiciness': 3, 'color': 7, 'taste': 59, 'texture': 10};
  var result_apple_22 = { 'fruit': 'Apple', 'juiciness': 5, 'color': 9, 'taste': 88, 'texture': 18};

  var result_pear = { 'fruit': 'Pear', 'juiciness': 2, 'color': 4, 'taste': 35, 'texture': 4};
  var result_pineapple = { 'fruit': 'Pineapple', 'juiciness': 1, 'color': 4, 'taste': 16, 'texture': 5};
  var result_banana = { 'fruit': 'Banana', 'juiciness': 1, 'color': 1, 'taste': 1, 'texture': 1};

  await WeekStatistic.createEach([
    { week: 24, year: 2020, results: [result_apple_24, result_pear, result_pineapple, result_banana]},
    { week: 23, year: 2020, results: [result_apple_23, result_pear, result_pineapple, result_banana]},
    { week: 22, year: 2020, results: [result_apple_22, result_pear, result_pineapple, result_banana]},
  ]);

  await Todo.createEach([
    {title: 'title 1', description: 'description 1'},
    {title: 'title 2', description: 'description 2'},
    {title: 'title 3', description: 'description 3'},
    {title: 'title 4', description: 'description 4'},
    {title: 'title 5', description: 'description 5'},
    {title: 'title 6', description: 'description 6'},
    {title: 'title 7', description: 'description 7'},
    {title: 'title 8', description: 'description 8'},
    {title: 'title 9', description: 'description 9'},
    {title: 'title 10', description: 'description 10'},
    {title: 'title 11', description: 'description 11'},
  ])
  // Save new bootstrap version
  await sails.helpers.fs.writeJson.with({
    destination: bootstrapLastRunInfoPath,
    json: {
      lastRunVersion: HARD_CODED_DATA_VERSION,
      lastRunAt: Date.now()
    },
    force: true
  })
  .tolerate((err)=>{
    sails.log.warn('For some reason, could not write bootstrap version .json file.  This could be a result of a problem with your configured paths, or, if you are in production, a limitation of your hosting provider related to `pwd`.  As a workaround, try updating app.js to explicitly pass in `appPath: __dirname` instead of relying on `chdir`.  Current sails.config.appPath: `'+sails.config.appPath+'`.  Full error details: '+err.stack+'\n\n(Proceeding anyway this time...)');
  });

};
