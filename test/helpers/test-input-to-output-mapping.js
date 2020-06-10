describe('map input to output', ()=>{

  var Sails = require('sails');

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
    it('should respond with volkskrant.svg', async ()=>{

      const input = 'someInput';

      console.log('input = '+input);
      var inputsString = { something: 'input' };

      var result = await sails.helpers.inputToOutput(inputsString);
      // var result = await sails.helpers.inputToOutput(input);

      console.log('result = '+ result);
    });
  });

  // sails.lower();

  after(function(done) {
    Sails.lower(done);
  });

});
