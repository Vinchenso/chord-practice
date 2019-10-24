import Component from '@ember/component';

export default Component.extend({
  actions: {
    toggle() {
      if (this.status == false) {
        this.onEnable();
      } else {
        this.onDisable();
      }
    },
    submitRefresh() {
      this.onDisable();
      this.onEnable();
    }
  }
});
