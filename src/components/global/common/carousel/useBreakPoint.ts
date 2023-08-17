import { ref, onMounted, onUnmounted, computed, reactive } from 'vue';

enum DeviceType {
  Mobile = 'sm',
  Tablet = 'md',
  Desktop = 'lg',
  GreaterDesktop = 'xl',
}

export const useBreakpoints = () => {
  let windowWidth = ref<number>(window.innerWidth);

  const onWidthChange = () => (windowWidth.value = window.innerWidth);
  onMounted(() => window.addEventListener('resize', onWidthChange));
  onUnmounted(() => window.removeEventListener('resize', onWidthChange));
  const responsive = reactive<{
    mobile: any;
    breakpoint: any;
    screenWidth: any;
  }>({
    mobile: null,
    breakpoint: null,
    screenWidth: null,
  });

  responsive.breakpoint = computed(() => {
    if (windowWidth.value < 641) return DeviceType.Mobile;
    if (windowWidth.value >= 641 && windowWidth.value < 769)
      return DeviceType.Tablet;
    if (windowWidth.value >= 769 && windowWidth.value < 1025)
      return DeviceType.Desktop;
    if (windowWidth.value > 1025) return DeviceType.GreaterDesktop;
    else return null; // This is an unreachable line, simply to keep eslint happy.
  });

  responsive.mobile = computed(() => {
    if (windowWidth.value < 1025) return true;
    else return false;
  });

  responsive.screenWidth = computed(() => windowWidth.value);

  return { responsive };
};
