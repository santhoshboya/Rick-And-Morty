import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

interface InfiniteScrollProps<T> {
  fetchData: (page: number) => Promise<{ items: T[]; hasMore: boolean }>;
  renderItem: (item: T, index: number) => React.ReactNode;
  initialPage?: number;
  loader?: React.ReactNode;
  endMessage?: React.ReactNode;
}

import { endMessage as endMessageStyle } from './Styles';

export function InfinitePageScroll<T>({
  fetchData,
  renderItem,
  initialPage = 1,
  loader = <h4>Loading...</h4>,
  endMessage: customEndMessage,
}: InfiniteScrollProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMore();
  }, []);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const result = await fetchData(page);
      setItems(prev => [...prev, ...result.items]);
      setHasMore(result.hasMore);
      setPage(prev => prev + 1);
    } finally {
      setLoading(false);
    }
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={loadMore}
      hasMore={hasMore}
      loader={loader}
      endMessage={customEndMessage ?? <p className={endMessageStyle}><b>No more data</b></p>}
    >
      {items.map(renderItem)}
    </InfiniteScroll>
  );
}
