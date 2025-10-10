import {type RefObject} from 'react';

type Props={
  isFetchingNextPage: boolean
  observerRef:RefObject<HTMLDivElement | null>
}
export const LoadingTrigger = ({observerRef, isFetchingNextPage}:Props) => {
  return (
        <div ref={observerRef}>
          {isFetchingNextPage
            ? <div>Loading more tracks...</div>
            : <div style={{height: '20px'}}/>
          }
        </div>
  );
};

