/**
 * <dropdown-select>
 * -----------------------------------------------------------------------------
 * A dropdown button that acts as select.
 *
 * @type {Component}
 *
 * -----------------------------------------------------------------------------
 */

parasails.registerComponent('dropdown-select', {
  //  ╔═╗╦═╗╔═╗╔═╗╔═╗
  //  ╠═╝╠╦╝║ ║╠═╝╚═╗
  //  ╩  ╩╚═╚═╝╩  ╚═╝
  props: [
    'options',
    'value'
  ],

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function (){

    return {
      //…
      // content: 'This was defined in quill.component.js:data()',
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
        <div class="dropdown">
        <div class="input-group">
            <div class="input-group-btn">
                <button class="btn btn-outline-primary btn-md dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Select a country
                </button>
                <div id="dropdown-items" class="dropdown-menu" onchange="selectMenu1" aria-labelledby="dropdownMenuButton">
                    <a class="dropdown-item" href="#">China</a>
                    <a class="dropdown-item" href="#">Denmark</a>
                    <a class="dropdown-item" href="#">USA</a>
                    <a class="dropdown-item" href="#">Netherlands</a>
                    <a class="dropdown-item" href="#">Germany</a>
                </div>
            </div>
        </div>
    </div>
  `,

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    //…
    console.log('dropdown-select.component.js:beforeMount()');

  },
  mounted: async function(){
    //…

    console.log('dropdown-select.component.js:mounted()');

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
    },

    _initializeComponent: function () {
      console.log('dropdown-select.component.js:_initialize()');

      // https://stackoverflow.com/questions/9895082/javascript-populate-drop-down-list-with-array

      const optionsAsArray = this.options.split(',');

      $.each(optionsAsArray, function(i, p) {
        console.log('found item: '+ p);
      });

      // load the dropdown with initial item
      $('#dropdown-items').empty();
      $.each(optionsAsArray, function(i, p) {
        $('#dropdown-items').append($('<a class="dropdown-item" href="#">' + p + '</a>'));
      });

      // https://stackoverflow.com/questions/4069982/document-getelementbyid-vs-jquery
      // $("#dropdownMenuButton").innerText = 'Elite Dangerous';
      console.log('setting initial value to: '+this.value);
      document.getElementById('dropdownMenuButton').innerText = this.value;

      $(".dropdown-menu a ").click(function(){
        $(this).parents(".input-group-btn").find('.btn').text($(this).text());
        value = $(this).text();
        console.log('value was set to: '+value);
      });

      // $("#dropdownMenuButton").click(function(){
      //   console.log('dropdownMenuButton was clicked');
      //   $(this).parents(".input-group-btn").find('.btn').text($(this).text());
      // });

    },

  }
});
