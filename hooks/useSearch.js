import { useState, useMemo } from 'react';

export const useSearch = (items, x) => {
  const [query, setQuery] = useState('');
  const [filteredItems, setfilteredItems] = useState(items);
  useMemo(() => {
    const result = items.filter((item) => {
      return `${item[x]}`.toLowerCase().includes(query.toLowerCase());
    });
    setfilteredItems(result);
  }, [items, query]);
  return { query, setQuery, filteredItems };
};

export const useFilterBy = (items, x, initialValue) => {
  const [query, setQuery] = useState(initialValue);
  const [filteredItems, setfilteredItems] = useState(items);
  useMemo(() => {
    const result = items.filter((item) => {
      return `${item[x]}`.toLowerCase().includes(query.toLowerCase());
    });
    setfilteredItems(result);
  }, [items, query]);
  return { query, setQuery, filteredItems };
};
