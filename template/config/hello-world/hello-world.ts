import { Component,Vue} from 'vue-property-decorator';

@StoryComponent({
  components: {},
  name: 'hello-world',
})

class HelloWorldView extends Vue {
  // --------------------------------------------------------------------------
  // [Private] Fields
  // --------------------------------------------------------------------------

  // --------------------------------------------------------------------------
  // [Public] Constructor
  // --------------------------------------------------------------------------

  constructor() {
    super();
  }

  // --------------------------------------------------------------------------
  // [Public] Accessors
  // --------------------------------------------------------------------------

  // --------------------------------------------------------------------------
  // [Public] Methods
  // --------------------------------------------------------------------------

  // --------------------------------------------------------------------------
  // [Private] Event Handlers
  // --------------------------------------------------------------------------

  // --------------------------------------------------------------------------
  // [Private] Methods
  // --------------------------------------------------------------------------

  // --------------------------------------------------------------------------
  // [Private] Lifecycle Hooks
  // --------------------------------------------------------------------------

  private mounted() {
    // TODO: stuff to do when this component loads.
  }
}

export {
    HelloWorldView as default,
    HelloWorldView,
};
