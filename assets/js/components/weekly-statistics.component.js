/**
 * <week-statistics>
 * -----------------------------------------------------------------------------
 * An AMCharts-based view of the weekly statistics
 *
 * @type {Component}
 *
 * @event click   [emitted when clicked]
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('weekly-statistics', {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: {

    value: {
      type: Array
    },

    week: {
      type: String
    },

    year: {
      type: String
    },
  },

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  // data: function (){
  //
  //   return {
  //     //…
  //     // content: 'This was defined in quill.component.js:data()',
  //
  //   };
  // },

  data: () => ({
  }),


  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
        <div>
            <h5>Statistics for week {{week}}, {{year}}</h5>
            <div id="chartdiv" style="width: 100%; height: 500px;"></div>
        </div>
  `,

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    //…

  },
  mounted: async function(){
    //…
    this._initializeComponent();

  },
  beforeDestroy: function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {

    click: async function(){
      this.$emit('click');

      console.log('CLICK registered');
    },

    _initializeComponent: async function () {

      var selectedArrayItem = 2;

      var i;
      for (i = 0; i < this.value.length; i++) {
        console.log('this.value[i].week: '+this.value[i].week);
        console.log('week:               '+this.week);
        console.log('this.value[i].week === this.week: '+ parseInt(this.value[i].week.valueOf(), 10) === parseInt(this.week.valueOf(),10));
        if (parseInt(this.value[i].week.valueOf(), 10) === parseInt(this.week.valueOf(),10)) {
          selectedArrayItem = i;
        }
      }
      console.log('selectedArrayItem: '+selectedArrayItem);

      const weekData = this.value[selectedArrayItem].results;

      am4core.ready(function () {

        // Themes begin
        am4core.useTheme(am4themes_kelly);
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("chartdiv", am4charts.XYChart);

        // Add data
        if (this.weekData) {
          console.log('this.weekData contains: '+weekData);
        }

        if (weekData)
        {
          // console.log('weekData client side: ' + weekData);
          chart.data = weekData;
        }
        // else
        // {
        //   console.log('No weekData found on client side: ');
        //   chart.data = weekData;
        // }

        chart.legend = new am4charts.Legend();
        chart.legend.position = "right";

        // Create axes
        var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "fruit";
        categoryAxis.renderer.grid.template.opacity = 0;

        var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.renderer.grid.template.opacity = 0;
        valueAxis.renderer.ticks.template.strokeOpacity = 0.5;
        valueAxis.renderer.ticks.template.stroke = am4core.color("#495C43");
        valueAxis.renderer.ticks.template.length = 10;
        valueAxis.renderer.line.strokeOpacity = 0.5;
        valueAxis.renderer.baseGrid.disabled = true;
        valueAxis.renderer.minGridDistance = 40;

        function createSeries(field, name) {

          var series = chart.series.push(new am4charts.ColumnSeries());
          series.dataFields.valueX = field;
          series.dataFields.categoryY = "fruit";
          series.stacked = true;
          series.name = name;

          var labelBullet = series.bullets.push(new am4charts.LabelBullet());
          labelBullet.locationX = 0.5;
          labelBullet.label.text = "{valueX}";
          labelBullet.label.fill = am4core.color("#fff");
        }

        // Create series
        createSeries("juiciness", "Juiciness");
        createSeries("color", "Color");
        createSeries("taste", "Taste");
        createSeries("texture", "Texture");

      }); // end am4core.ready()
    },
  },
});
