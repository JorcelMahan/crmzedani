import { useState, useMemo } from 'react';

export const useSearch = (items) => {
  const [query, setQuery] = useState('');
  const [filteredItems, setfilteredItems] = useState(items);
  useMemo(() => {
    const result = items.filter((item) => {
      return `${item.codigo}`.toLowerCase().includes(query.toLowerCase());
    });
    setfilteredItems(result);
  }, [items, query]);
  return { query, setQuery, filteredItems };
};
