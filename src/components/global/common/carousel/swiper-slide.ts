import { h, ref, defineComponent } from 'vue';

export default defineComponent({
  name: 'SwiperSlide',
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    rounded: {
      type: Number,
      default: 0,
    },
  },
  setup({ tag, rounded }, { slots }) {
    const slideElRef = ref<HTMLElement>();
    const slot = slots.default ? slots.default() : [];

    return () => {
      return h(
        tag,
        {
          class: 'slide overflow-hidden',
          style: {
            'border-radius': rounded + 'px',
          },
          ref: slideElRef,
        },
        slot
      );
    };
  },
});
