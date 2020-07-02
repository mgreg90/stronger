<template>
  <transition name="fade">
    <div class="app-modal" v-if="show">
      <div class="app-modal__backdrop" @click="closeModal()"/>

      <div class="app-modal__dialog">
        <div class="app-modal__header">
          <slot name="header"/>
          <div class="app-modal__close-wrapper">
            <i class="app-modal__close material-icons md-24" @click="closeModal()">close</i>
          </div>
        </div>

        <div class="app-modal__body">
          <slot name="body"/>
        </div>

        <div class="app-modal__footer">
          <slot name="footer"/>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
const data = () => ({ show: false });

const methods = {
  closeModal() {
    this.$set(this, 'show', false);
    this.$emit('onClose');
    document.querySelector('body').classList.remove('overflow-hidden');
  },
  openModal() {
    this.$set(this, 'show', true);
    document.querySelector('body').classList.add('overflow-hidden');
  },
};

export default {
  name: 'Modal',
  data,
  methods,
};
</script>

<style lang="scss" scoped>
.app-modal {
  overflow-x: hidden;
  overflow-y: auto;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  font-family: $default-font;

  &__backdrop {
    background-color: rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
  }

  &__dialog {
    background: white;
    position: relative;
    width: 600px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    z-index: 2;
    @media screen and (max-width: 992px) {
      width: 90%;
    }
  }

  &__close-wrapper {
    position: absolute;
    top: -10px;
    right: -10px;
    color: $red;
    border: 0;
    background: white;
    border-radius: 100%;
    height: 24px;
    width: 24px;
    border: $red 2px solid;

    i {
      position: relative;
      top: -2px;
      left: -2px;
    }
  }

  &__header {
    padding: 20px;
    display: flex;
    justify-content: center;
    font-size: 18px;
  }

  &__body {
    padding: 10px 20px 10px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  &__footer {
    padding: 10px 20px 20px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
