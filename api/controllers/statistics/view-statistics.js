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

    var weekStatistics = await WeekStatistic.find({ year });
    var availableWeeks = weekStatistics.map(ws => ws.week.toString());

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
