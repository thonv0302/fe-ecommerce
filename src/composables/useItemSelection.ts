import { reactive } from 'vue';

export const useItemSelection = () => {
  let itemSet = new Set();
  const items = reactive(itemSet);

  const clear = () => {
    items.clear();
  };

  const toggle = (id: any) => {
    if (items.has(id)) {
      items.delete(id);
    } else {
      items.add(id);
    }
  };

  const addMultiple = (newItems: any) => {
    newItems.forEach((item: any) => {
      items.add(item);
    });
  };

  const addOne = (item: any) => {
    items.add(item);
  };

  return {
    items,
    clear,
    toggle,
    addOne,
    addMultiple,
  };
};
