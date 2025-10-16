import {useCallback, useEffect, useRef} from "react";

type Props={
  isFetching: boolean
  hasNextPage: boolean
  fetchNextPage: () => void
  rootMargin?: string
  threshold?: number
}

export function useInfiniteScroll(props:Props) {
  const {
    hasNextPage,
    isFetching,
    fetchNextPage,
    rootMargin = '100px',
    threshold = 0.1,
  }=props;

  const observerRef = useRef<HTMLDivElement>(null)

  const loadMoreHandler = useCallback(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetching, fetchNextPage])

  useEffect(() => {
    // IntersectionObserver отслеживает элементы и сообщает, насколько они видны во viewport
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    const currentObserverRef = observerRef.current
    if (!currentObserverRef) return


    const observer = new IntersectionObserver(
      entries => {
        // entries - наблюдаемый элемент
        if (entries.length > 0 && entries[0].isIntersecting) {
          loadMoreHandler()
        }
      },
      {
        root: null, // Отслеживание относительно окна браузера (viewport). null = весь экран
        rootMargin, // Начинать загрузку до появления элемента
        threshold, // Срабатывать когда % элемента становится видимым
      }
    )

    if (currentObserverRef) {
      // начинает наблюдение за элементом
      observer.observe(currentObserverRef)
    }

    // Функция очистки - прекращает наблюдение при размонтировании компонента
    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef)
      }
    }
  }, [loadMoreHandler, rootMargin, threshold])
  return {observerRef}
}

