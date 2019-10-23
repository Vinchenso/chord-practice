import Component from '@ember/component';

export default Component.extend({
  actions: {
    submitEnable() {
      this.onEnable();
    },
    submitDisable() {
      this.onDisable();
    },
    submitRefresh() {
      this.onDisable();
      this.onEnable();
    }
  }
});
