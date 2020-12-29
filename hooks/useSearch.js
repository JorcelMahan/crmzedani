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

export const useSearchMore = (items, x, y, z) => {
  const [query, setQuery] = useState('');
  const [filteredItems, setfilteredItems] = useState(items);
  useMemo(() => {
    const result = items.filter((item) => {
      return `${item[x]} ${item[y]} ${item[z]}`
        .toLowerCase()
        .includes(query.toLowerCase());
    });
    setfilteredItems(result);
  }, [items, query]);
  return { query, setQuery, filteredItems };
};

export const useFilterBy = (items, x, initialValue) => {
  const [field, setfield] = useState(initialValue);

  const [filteredElem, setfilteredElem] = useState(items);
  useMemo(() => {
    const result =
      field === 'todos'
        ? items
        : items.filter((item) => `${item[x]}` === field);
    setfilteredElem(result);
  }, [items, field]);
  return { field, setfield, filteredElem };
};

export const useFilterByTalla = (items, initialValue) => {
  const [talla, settalla] = useState(initialValue);

  const [filteredTalla, setfilteredTalla] = useState(items);
  useMemo(() => {
    const result =
      talla === 'todos'
        ? items
        : items.filter((item) => item.tallas[talla] > 0);
    setfilteredTalla(result);
  }, [items, talla]);
  return { talla, settalla, filteredTalla };
};
