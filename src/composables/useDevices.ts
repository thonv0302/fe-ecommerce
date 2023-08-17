import { Ref } from 'vue';
import { useBreakpoints, breakpointsTailwind } from '@vueuse/core';
export default function useDevice(): {
  mdAndSmaller: Ref<boolean>;
} {
  const breakpoints = useBreakpoints(breakpointsTailwind);
  const mdAndSmaller = breakpoints.smaller('lg'); // lg and smaller
  return {
    mdAndSmaller,
  };
}
