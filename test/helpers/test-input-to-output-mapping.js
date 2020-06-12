describe('map input to output', ()=>{

  var Sails = require('sails');
  var assert = require('assert');

  before(function(done) {
    this.timeout(50000);

    Sails.lift({},
      function(err,server) {
        if(err) {
          done(err);
        } else {
          done(err,sails);
        }
      });
  });

  // var sails = require('sails');

  // sails.lift();

  describe('mediumToLogo test', ()=>{
    it('Should respond with someOutput', async ()=>{

      const input = 'someInput';

      var result = await sails.helpers.inputToOutput(input);
      // var result = await sails.helpers.inputToOutput(input);

      assert.equal('someOutput', result);
      console.log('result = '+ result);
    });
  });

  // sails.lower();

  after(function(done) {
    Sails.lower(done);
  });

});
