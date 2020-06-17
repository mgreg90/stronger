<template>
  <transition name="fade">
    <div class="modal" v-if="show">
      <div class="modal__backdrop" @click="closeModal()"/>

      <div class="modal__dialog">
        <div class="modal__header">
          <slot name="header"/>
          <div class="modal__close-wrapper">
            <i class="modal__close material-icons md-36" @click="closeModal()">close</i>
          </div>
        </div>

        <div class="modal__body">
          <slot name="body"/>
        </div>

        <div class="modal__footer">
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
    this.show = false;
    this.$emit('onClose');
    document.querySelector('body').classList.remove('overflow-hidden');
  },
  openModal() {
    this.show = true;
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
.modal {
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
    top: -12px;
    right: -12px;
    color: $red;
    border: 0;
    background: white;
    border-radius: 100%;
    height: 24px;
    border: $red 2px solid;
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
