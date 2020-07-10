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
            <div ref="chartdiv" style="width: 100%; height: 500px;"></div>
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
    this.chart.dispose();
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
      let weekData
      for (const v of this.value) {
        if (v.week === ~~this.week) {
          weekData = v.results;
          break;
        }
      }

      if (!weekData) return;

      am4core.ready(() => {
        // Themes begin
        am4core.useTheme(am4themes_kelly);
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = this.chart = am4core.create(this.$refs.chartdiv, am4charts.XYChart);
        chart.data = weekData;

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
