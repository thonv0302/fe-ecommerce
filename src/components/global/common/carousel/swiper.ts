import {
  h,
  ref,
  defineComponent,
  onMounted,
  onUnmounted,
  computed,
  Ref,
} from 'vue';
import { useBreakpoints } from './useBreakPoint';
import { PlayStatus, DeviceType } from './enum';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';

export default defineComponent({
  name: 'Swiper',
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    wrapperTag: {
      type: String,
      default: 'div',
    },
    slidePerView: {
      type: Number,
      default: 1,
    },
    responsiveDevice: {
      type: Object,
      default: () => ({
        sm: 1,
        md: 2,
      }),
    },
    spaceBetween: {
      type: Number,
      default: 10,
    },
    navigation: {
      type: Boolean,
      default: false,
    },
    pagination: {
      type: Boolean,
      default: false,
    },
    direction: {
      type: String,
      default: PlayStatus.Forward,
    },
    autoplay: {
      type: Boolean,
      default: false,
    },
    time: {
      type: Number,
      default: 3000,
    },
    thumbImages: {
      type: Boolean,
      default: false,
    },
    thumbCols: {
      type: Number,
      default: 4,
    },
    infinitive: {
      type: Boolean,
      default: false,
    },
    dragSlide: {
      type: Boolean,
      default: false,
    },
  },
  setup(
    {
      tag,
      wrapperTag,
      slidePerView,
      spaceBetween,
      navigation,
      responsiveDevice,
      pagination,
      direction,
      autoplay,
      time,
      thumbImages,
      thumbCols,
      infinitive,
      dragSlide,
    },
    { slots }
  ) {
    const { responsive } = useBreakpoints();
    const swiperElRef = ref() as Ref<HTMLDivElement>;
    const slideContainerElRef = ref() as Ref<HTMLDivElement>;
    const scrollLeft = ref(0) as Ref<number>;
    const totalSlides = ref(0) as Ref<number>;
    const totalDots = ref(0) as Ref<number>;
    const autoPlay = ref();
    const listURLImages = ref([]) as Ref<Array<string>>;

    onMounted(() => {
      totalSlides.value = (
        document.querySelectorAll('.slide') as NodeListOf<HTMLElement>
      ).length;
      getURLImages(
        document.querySelectorAll('.slide img') as NodeListOf<HTMLElement>
      );

      startAutoPlay();
      handleResize();
      window.addEventListener('resize', handleResize);
    });
    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
    });

    const slot = slots.default ? slots.default() : [];
    const responsiveSildePerView = computed(() => {
      if (responsive.breakpoint === DeviceType.Mobile) {
        return responsiveDevice.sm;
      } else if (responsive.breakpoint === DeviceType.Table) {
        return responsiveDevice.md;
      } else {
        return slidePerView;
      }
    });

    const slideContainerStyle = computed(() => {
      return {
        'grid-auto-columns': `calc((100% / ${responsiveSildePerView.value}) - ${
          ((responsiveSildePerView.value - 1) * spaceBetween) /
          responsiveSildePerView.value
        }px)`,
        gap: spaceBetween + 'px',
      };
    });

    const handleResize = () => {
      navigate(0);
      totalDots.value = totalSlides.value - (responsiveSildePerView.value - 1);
      scrollLeft.value =
        (document.querySelector('.slide') as HTMLElement)?.offsetWidth +
        spaceBetween;
      if (responsive.mobile) {
        slideContainerElRef.value.addEventListener('touchstart', touchStart);
        slideContainerElRef.value.addEventListener('touchmove', touchMove);
        slideContainerElRef.value.addEventListener('touchend', dragStop);
      }
    };

    const navigate = (arg: number | PlayStatus) => {
      if (slideContainerElRef.value) {
        slideContainerElRef.value.scrollLeft = getNewScrollPosition(arg);
      }
    };

    const currentIndex = ref<number>(0);
    const getNewScrollPosition = (arg: number | PlayStatus): number => {
      if (arg === PlayStatus.Forward) {
        currentIndex.value += 1;
        if (
          currentIndex.value >
          totalSlides.value - responsiveSildePerView.value
        ) {
          currentIndex.value = 0;
        }
      } else if (arg === PlayStatus.Backward) {
        currentIndex.value -= 1;
        if (currentIndex.value < 0) {
          currentIndex.value = totalSlides.value - responsiveSildePerView.value;
        }
      } else if (typeof arg === 'number') {
        currentIndex.value = arg;
      }
      return currentIndex.value * scrollLeft.value;
    };

    const startAutoPlay = () => {
      if (autoPlay.value) clearInterval(autoPlay.value);

      if (autoplay) {
        autoPlay.value = setInterval(
          () => navigate(direction as PlayStatus),
          time
        );
      }
    };

    const getURLImages = (imgNodes: NodeListOf<HTMLElement>) => {
      listURLImages.value = [];

      for (var i = 0; i < imgNodes.length; i++) {
        var imgNode = imgNodes[i];
        // Check if the node is an <img> tag
        if (imgNode.tagName === 'IMG') {
          // Get the src attribute value
          var src = imgNode.getAttribute('src');

          // Add the src value to the array
          listURLImages.value.push(src as string);
        }
      }
    };

    const isDragStart = ref<boolean>(false);
    const startX = ref<number>(0);
    const prevScrollLeft = ref<number>(0);
    const dragStart = (e: MouseEvent) => {
      isDragStart.value = true;
      startX.value = e.pageX;
      prevScrollLeft.value = slideContainerElRef.value.scrollLeft;
    };

    const touchStart = (e: TouchEvent) => {
      isDragStart.value = true;
      startX.value = e.touches[0].pageX;
      prevScrollLeft.value = slideContainerElRef.value.scrollLeft;
    };

    const number = ref<number>(0);
    const LEVEL_MOVE = 0.05;
    const LEVEL_MOVE_INFINITIVE = 0.3;
    const translateRight = ref(false);
    const translateLeft = ref(false);
    const dragging = (e: MouseEvent) => {
      if (!isDragStart.value || !dragSlide) return;
      if (autoPlay.value) clearInterval(autoPlay.value);
      const distance = startX.value - e.pageX;
      if (slideContainerElRef.value) {
        slideContainerElRef.value.scrollLeft = prevScrollLeft.value + distance;
      }

      const divide = slideContainerElRef.value.scrollLeft / scrollLeft.value;
      let activeIndex;
      // drag left
      if (distance > 0) {
        activeIndex = Math.floor(divide);
        number.value = activeIndex;
        if (divide - activeIndex >= LEVEL_MOVE) {
          number.value = activeIndex + 1;
        }
      }
      // drag right
      else {
        activeIndex = Math.ceil(divide);
        number.value = activeIndex;

        if (divide - activeIndex <= -LEVEL_MOVE) {
          number.value = activeIndex - 1;
        }
      }

      if (
        distance > 0 &&
        totalSlides.value - responsiveSildePerView.value === currentIndex.value
      ) {
        translateRight.value = true;
        if (infinitive && divide - activeIndex > -LEVEL_MOVE_INFINITIVE)
          number.value = 0;
      } else if (distance < 0 && currentIndex.value === 0) {
        translateLeft.value = true;
        if (infinitive && divide - activeIndex <= LEVEL_MOVE_INFINITIVE)
          number.value = totalSlides.value - responsiveSildePerView.value;
      }
      currentIndex.value = activeIndex;
    };

    const touchMove = (e: TouchEvent) => {
      if (!isDragStart.value || !dragSlide) return;
      e.preventDefault();
      if (autoPlay.value) clearInterval(autoPlay.value);
      const distance = startX.value - e.touches[0].pageX;

      if (slideContainerElRef.value) {
        slideContainerElRef.value.scrollLeft = prevScrollLeft.value + distance;
      }

      const divide = slideContainerElRef.value.scrollLeft / scrollLeft.value;

      let activeIndex;
      // drag left
      if (distance > 0) {
        activeIndex = Math.floor(divide);
        number.value = activeIndex || currentIndex.value;
        if (divide - activeIndex >= LEVEL_MOVE) {
          number.value = activeIndex + 1;
        }
      }
      // drag right
      else {
        activeIndex = Math.ceil(divide);
        number.value = activeIndex || currentIndex.value;
        if (divide - activeIndex <= -LEVEL_MOVE) {
          number.value = activeIndex - 1;
        }
      }

      if (
        distance > 0 &&
        totalSlides.value - responsiveSildePerView.value === currentIndex.value
      ) {
        translateRight.value = true;
        if (infinitive && divide - activeIndex > -LEVEL_MOVE_INFINITIVE)
          number.value = 0;
      } else if (distance < 0 && currentIndex.value === 0) {
        translateLeft.value = true;
        if (infinitive && divide - activeIndex <= LEVEL_MOVE_INFINITIVE)
          number.value = totalSlides.value - responsiveSildePerView.value;
      }

      currentIndex.value = activeIndex;
    };

    const dragStop = () => {
      isDragStart.value = false;
      translateRight.value = false;
      translateLeft.value = false;
      setTimeout(() => {
        navigate(number.value);
      }, 0.1);
    };

    const activeIndexes = (index: number): boolean => {
      for (let i = 0; i < responsiveSildePerView.value; i++) {
        if (index === currentIndex.value + i) {
          return true;
        }
      }
      return false;
    };

    return () => {
      return [
        h(
          tag,
          {
            ref: swiperElRef,
            class: 'w-full mx-auto relative select-none',
          },
          [
            h(
              wrapperTag,
              {
                ref: slideContainerElRef,
                class: [
                  'grid grid-flow-col overflow-y-hidden overflow-x-hidden  select-none transition duration-350',
                  {
                    'scroll-smooth': !isDragStart.value,
                    '-translate-x-[100px]': translateRight.value && !infinitive,
                    'translate-x-[100px]': translateLeft.value && !infinitive,
                  },
                ],
                style: [slideContainerStyle.value],
                onmousedown: dragStart,
                onmousemove: dragging,
                onmouseup: dragStop,
                onmouseout: () => {
                  translateRight.value = false;
                  translateLeft.value = false;
                  isDragStart.value = false;
                  startAutoPlay();
                },
                onmouseenter: () => {
                  if (autoPlay.value) clearInterval(autoPlay.value);
                },
              },
              [slot]
            ),
            [
              navigation
                ? [
                    h(
                      'button',
                      {
                        class: 'p-2 absolute -translate-y-1/2 top-1/2',
                        onClick: () => {
                          navigate(PlayStatus.Backward);
                          startAutoPlay();
                        },
                      },
                      [
                        infinitive || currentIndex.value !== 0
                          ? h(ChevronLeftIcon, {
                              class: 'w-6 h-6',
                            })
                          : '',
                      ]
                    ),
                    h(
                      'button',
                      {
                        class: 'p-2 absolute -translate-y-1/2 top-1/2 right-0',
                        onClick: () => {
                          navigate(PlayStatus.Forward);
                          startAutoPlay();
                        },
                      },
                      [
                        infinitive ||
                        currentIndex.value !==
                          totalSlides.value - responsiveSildePerView.value
                          ? h(ChevronRightIcon, {
                              class: 'w-6 h-6',
                            })
                          : '',
                      ]
                    ),
                  ]
                : '',
              pagination
                ? [
                    h(
                      'div',
                      {
                        class:
                          'absolute flex gap-2 justify-center bottom-2 left-1/2 -translate-x-1/2',
                      },
                      [
                        [
                          [...Array(totalDots.value)]
                            .map((_, i) => i)
                            .map((index) =>
                              h('div', {
                                key: index,
                                class: [
                                  'w-4 h-4 rounded-full cursor-pointer opacity-75',
                                  {
                                    'bg-slate-500':
                                      currentIndex.value === index,
                                    'bg-white ': currentIndex.value !== index,
                                  },
                                ],
                                onClick: () => {
                                  navigate(index);
                                  startAutoPlay();
                                },
                              })
                            ),
                        ],
                      ]
                    ),
                  ]
                : '',
            ],
          ]
        ),
        thumbImages
          ? h(
              'div',
              {
                class: 'grid gap-3 grid-cols-4 mx-auto mt-4',
                style: {
                  'grid-template-columns': `repeat(${thumbCols}, minmax(0, 1fr))`,
                },
              },
              listURLImages.value.map((image, index) => {
                return h(
                  'div',
                  {
                    key: index,
                    class: 'cursor-pointer transition-all ',
                    onClick: () => {
                      let minIndex = index;
                      const maxIndex =
                        listURLImages.value.length -
                        responsiveSildePerView.value;
                      if (
                        index >
                        listURLImages.value.length -
                          responsiveSildePerView.value
                      ) {
                        minIndex = maxIndex;
                      }
                      navigate(minIndex);
                      startAutoPlay();
                    },
                  },
                  h(
                    'button',
                    {
                      class: [
                        'p-1',
                        {
                          'outline outline-blue-600 rounded-md':
                            activeIndexes(index),
                        },
                      ],
                    },
                    h('img', {
                      class:
                        'object-cover aspect-square rounded-md overflow-hidden',
                      src: image,
                    })
                  )
                );
              })
            )
          : '',
      ];
    };
  },
});
