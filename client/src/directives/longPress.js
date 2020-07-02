/* eslint no-param-reassign: 0 */
const longPressStop = new CustomEvent('long-press-stop');
const longPressStart = new CustomEvent('long-press-start');

export const directiveOption = {
  bind(el, binding, vnode) {
    el.dataset.longPressTimeoutId = '0';

    const onscroll = () => {
      console.log('scroll caught');
      clearTimeout(parseInt(el.dataset.longPressTimeoutId, 10));
    };

    const onpointerup = () => {
      clearTimeout(parseInt(el.dataset.longPressTimeoutId, 10));

      if (vnode.componentInstance) {
        vnode.componentInstance.$emit('long-press-stop');
      } else {
        el.dispatchEvent(longPressStop);
      }

      document.removeEventListener('pointerup', onpointerup);
      document.removeEventListener('scroll', onpointerup);
    };

    const onpointerdown = () => {
      document.addEventListener('scroll', onscroll, true);
      document.addEventListener('pointerup', onpointerup);

      const timeout = setTimeout(() => {
        if (vnode.componentInstance) {
          vnode.componentInstance.$emit('long-press-start');
        } else {
          el.dispatchEvent(longPressStart);
        }
      }, binding.value);

      el.dataset.longPressTimeoutId = timeout.toString();
    };

    el.$_long_press_pointerdown_handler = onpointerdown;
    el.addEventListener('pointerdown', onpointerdown);
  },

  unbind(el) {
    clearTimeout(parseInt(el.dataset.longPressTimeoutId, 10));
    el.removeEventListener('pointerdown', el.$_long_press_pointerdown_handler);
  },
};

export default directiveOption;
