module.exports = {


  friendlyName: 'View statistics',


  description: 'Display "View statistics" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/statistics/view-statistics',
    }
  },

  fn: async function () {

    const year = '2020';

    var weekStatistics = await WeekStatistic.find( { year: year } );

    var availableWeeks = [];

    var i;
    for (i = 0; i < weekStatistics.length; i++) {
      // console.log(weekStatistic[i].week);
      availableWeeks[i] = weekStatistics[i].week.toString();
    }

    console.log('availableWeeks: '+availableWeeks);
    console.log('availableWeeks: '+JSON.stringify(availableWeeks));

    console.log('weekStatistic from database for: ' + JSON.stringify(weekStatistics));
    // console.log("weekStatistic[0].mediumResults[0]: " + JSON.stringify(weekStatistic.mediumResults));

    // const week = '24';

    return {
      weekData: weekStatistics,
      week: availableWeeks[0],
      year: year,
      availableWeeks: availableWeeks,
    };
  }
};

//
// var weekData = [ {
//   'medium': 'NOS',
//   'feitelijk_onjuist': 3,
//   'informatie_incompleet': 7,
//   'vooringenomen': 29,
//   'censuur': 2,
// }, {
//   'medium': 'NRC',
//   'feitelijk_onjuist': 2,
//   'informatie_incompleet': 4,
//   'vooringenomen': 35,
//   'censuur': 4,
// }, {
//   'medium': 'Volkskrant',
//   'feitelijk_onjuist': 1,
//   'informatie_incompleet': 4,
//   'vooringenomen': 16,
//   'censuur': 5,
// }, {
//   'medium': 'Telegraaf',
//   'feitelijk_onjuist': 1,
//   'informatie_incompleet': 1,
//   'vooringenomen': 1,
//   'censuur': 1 }
// ];
