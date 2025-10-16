import {useFetchTracksInfiniteQuery} from "@/features/tracks/api/tracksApi.ts";
import {useInfiniteScroll} from "@/common/hooks";
import {TracksList} from "@/features/tracks/ui/TracksList/TracksList.tsx";
import {LoadingTrigger} from "@/features/tracks/ui/LoadingTrigger/LoadingTrigger.tsx";

export const TracksPage = () => {


  const {data, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage} = useFetchTracksInfiniteQuery()
  // console.log(data)//{pages: Array(1), pageParams: Array(1)}
  /*
    const pages1 = data?.pages.map((page) => page.data) || []//: TrackData[][]
    console.log(pages1)
    //[
    // [
    // {id: '88133ec1-f82d-4fbb-b53b-5138b6fc7b90', type: 'tracks', attributes: {…}, relationships: {…}}
    // {id: '79fce981-0956-4415-875c-9f90c6ad8a97', type: 'tracks', attributes: {…}, relationships: {…}}
    // {id: '75e4b87d-758e-43e6-8cf7-2fa0bd2ef413', type: 'tracks', attributes: {…}, relationships: {…}}
    // {id: '50587ef5-d06d-4d3e-9e81-821d20f30d2e', type: 'tracks', attributes: {…}, relationships: {…}}
    // {id: '8c81e17a-281a-4015-9066-51cf3266ad7a', type: 'tracks', attributes: {…}, relationships: {…}}
    // ]
    //]
  */
  /*
    const pages2 = data?.pages.map((page) => page.data).flat() || []//: TrackData[]
    console.log(pages2)
    // [
    // {id: '88133ec1-f82d-4fbb-b53b-5138b6fc7b90', type: 'tracks', attributes: {…}, relationships: {…}}
    // {id: '79fce981-0956-4415-875c-9f90c6ad8a97', type: 'tracks', attributes: {…}, relationships: {…}}
    // {id: '75e4b87d-758e-43e6-8cf7-2fa0bd2ef413', type: 'tracks', attributes: {…}, relationships: {…}}
    // {id: '50587ef5-d06d-4d3e-9e81-821d20f30d2e', type: 'tracks', attributes: {…}, relationships: {…}}
    // {id: '8c81e17a-281a-4015-9066-51cf3266ad7a', type: 'tracks', attributes: {…}, relationships: {…}}
    // ]
  */

  const pages = data?.pages.flatMap((page) => page.data) || []//: TrackData[]
  // console.log(pages)
  // [
  // {id: '88133ec1-f82d-4fbb-b53b-5138b6fc7b90', type: 'tracks', attributes: {…}, relationships: {…}}
  // {id: '79fce981-0956-4415-875c-9f90c6ad8a97', type: 'tracks', attributes: {…}, relationships: {…}}
  // {id: '75e4b87d-758e-43e6-8cf7-2fa0bd2ef413', type: 'tracks', attributes: {…}, relationships: {…}}
  // {id: '50587ef5-d06d-4d3e-9e81-821d20f30d2e', type: 'tracks', attributes: {…}, relationships: {…}}
  // {id: '8c81e17a-281a-4015-9066-51cf3266ad7a', type: 'tracks', attributes: {…}, relationships: {…}}
  // ]
  {/*{data?.pages[0].data.map(track => {*/}

  /*
    const observerRef = useRef<HTMLDivElement>(null)
  */

  /*
   const loadMoreHandler = () => {
     // debugger
     if (hasNextPage && !isFetchingNextPage) {
       fetchNextPage()
     }
   }
 */

  /*
    useEffect(() => {

      //const observer = new IntersectionObserver(callback, options)
      //callback — функция, которая вызывается, когда элемент пересекает границу наблюдения (например, появляется в области видимости).
      // options — объект с настройками, определяющими, когда и как именно срабатывает наблюдение.

      //(entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void
      //entries — массив объектов IntersectionObserverEntry, по одному для каждого элемента, у которого изменилось состояние пересечения.
      //observer — сам наблюдатель (можно использовать для .unobserve() или .disconnect() прямо внутри callback’а).

      //настройки наблюдения
      //const options: IntersectionObserverInit = {
      //   root: null,
      //   rootMargin: '0px',
      //   threshold: 0,
      // }
      //root
      // Контейнер, относительно которого проверяется пересечение.
      // null — значит "экран браузера" (viewport).
      // Можно указать любой DOM-элемент:
      // например, root: document.querySelector('.scroll-container'),
      // тогда пересечения считаются относительно этой прокручиваемой области.
      //const observer = new IntersectionObserver(cb, {
      //   root: document.querySelector('#scrollArea'),
      // })
      //rootMargin
      // Отступы вокруг root, задаются как CSS-строка (px, %, em).
      // Используется, чтобы «расширить» или «сузить» область пересечения.
      // Можно думать об этом как об “виртуальной рамке”.

      //entries можно перевести как «записи пересечений» или «элементы наблюдения».
      const observer = new IntersectionObserver((entries) => {
        //new IntersectionObserver((entries) => { ... }) — создаёт наблюдатель, который при изменении пересечений будет вызывать коллбэк с entries — массивом объектов IntersectionObserverEntry.
        if (entries.length > 0 && entries[0].isIntersecting) {
          //entries[0].isIntersecting — проверка: первый наблюдаемый элемент стал видим (пересёк границу root). isIntersecting === true когда элемент видим.
          loadMoreHandler()
        }
      },{
        root:null,
        rootMargin:'100px',
        threshold:0.1
      })

      const currentObserverRef = observerRef.current
      if (currentObserverRef) {
        observer.observe(currentObserverRef)
        //начинаем наблюдать за DOM-узлом, на который указывает observerRef.current.
      }
  //Функция очистки (cleanup) это часть useEffect, которая выполняется перед размонтированием компонента или перед повторным вызовом эффекта.
      return () => {
        if (currentObserverRef) {
          observer.unobserve(currentObserverRef)
          //отписываем наблюдателя от элемента
        }
      }
    }, [loadMoreHandler])
  */

  const {observerRef} = useInfiniteScroll({hasNextPage, isFetching, fetchNextPage})

  return (
    <div>
      <h1>Tracks page</h1>
      <TracksList tracks={pages}/>

      {/*
      {!isLoading && (
        <>
          {hasNextPage
            ? (
            <button onClick={loadMoreHandler} disabled={isFetching}>
              {isFetchingNextPage
                ? 'Loading...'
                : 'Load More'}
            </button>
          ) : (
            <p>Nothing more to load</p>
          )}
        </>
      )}
*/}
      {
        hasNextPage &&
        <LoadingTrigger isFetchingNextPage={isFetchingNextPage} observerRef={observerRef}/>
      }
      {!hasNextPage && pages.length > 0 && <p>Nothing more to load</p>}

    </div>
  )
}