import { useEffect, useState } from 'react';

function usePagination(items, itemsPerPage) {
  const initialState = {
    itemsPerPage: 0,
    currentPage: 1,
  };

  const [state, setState] = useState(initialState);

  const getTotalPages = () => Math.ceil(items.length / itemsPerPage);

  const updateCurrentPage = pageNumber =>
    setState(state => ({
      ...state,
      currentPage: pageNumber,
    }));

  useEffect(() => {
    setState(state => ({
      ...state,
      itemsPerPage: itemsPerPage,
    }));
    return cleanup;
  }, [itemsPerPage]);

  const itemsForCurrentPage = () =>
    items.slice(
      getInitialItemIndexForCurrentPage(),
      getInitialItemIndexForCurrentPage() + state.itemsPerPage
    );

  const getInitialItemIndexForCurrentPage = () =>
    (state.currentPage - 1) * state.itemsPerPage;

  const cleanup = () => setState(initialState);

  return [
    itemsForCurrentPage(),
    {
      totalPages: getTotalPages(),
      currentPage: state.currentPage,
      updateCurrentPage,
    },
  ];
}

export default usePagination;
