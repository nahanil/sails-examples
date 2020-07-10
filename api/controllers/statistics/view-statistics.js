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

    console.log('weekStatistics from database: ' + JSON.stringify(weekStatistics));
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
