export function useFeedback(initialItems) {
  const [items, setItems] = useState(initialItems);

  function update(id) {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, isOn: !item.isOn };
        }

        // اگر گروه دکمه‌ها یکی است ولی آیتم چیز دیگری است → خاموش کن
        const clickedItem = prev.find((i) => i.id === id);
        if (item.group === clickedItem.group) {
          return { ...item, isOn: false };
        }

        return item;
      })
    );
  }

  return { items, update };
}
