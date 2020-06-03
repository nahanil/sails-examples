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
  props: {
    options: {
      type: Array,
      default: () => [
        'China', 'Denmark', 'USA', 'Netherlands', 'Germany'
      ]
    },

    value: {
      type: String
    },

    label: {
      type: String,
      default: "Select an option"
    },
  },

  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: function () {
    return {
      isOpen: false,
    };
  },

  //  ╦ ╦╔╦╗╔╦╗╦
  //  ╠═╣ ║ ║║║║
  //  ╩ ╩ ╩ ╩ ╩╩═╝
  template: `
    <div class="dropdown">
        <div class="input-group">
            <div class="input-group-btn" :class="{ show: isOpen }">
                <button class="btn btn-outline-primary btn-md dropdown-toggle"
                        type="button"
                        aria-haspopup="true"
                        :aria-expanded="isOpen"
                        @click.prevent="isOpen = !isOpen">
                    {{ value || label }}
                </button>
                <div class="dropdown-menu"
                     :class="{ show: isOpen }">
                     <!--
                        You'll need to generate a unique ID for each instance
                        of the component for
                        aria-labelledby="dropdownMenuButton"
                      -->
                    <a v-for="(option, idx) of options"
                       :selected="value === option"
                       :key="idx"
                       class="dropdown-item"
                       href="#"
                       @click.prevent="onSelectItem(option)">{{ option }}</a>
                </div>
            </div>
        </div>
    </div>
  `,

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    onSelectItem (option) {
      this.$emit('input', option);
      this.isOpen = false;
    },
  }
});
