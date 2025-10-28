import type {
  CreatePlaylistArgs,
  FetchPlaylistsArgs,
  PlaylistCreatedEvent,
  PlaylistUpdatedEvent,
  UpdatePlaylistArgs,
} from "@/features/playlists/api/playlistsApi.types.ts";
import { baseApi } from "@/app/api/baseApi.ts";
import { current } from "@reduxjs/toolkit";
import {
  playlistCreateResponseSchema,
  playlistsResponseSchema,
} from "@/features/playlists/model/playlists.schemas.ts";
import { withZodCatch } from "@/common/utils";
import { SOCKET_EVENTS } from "@/common/constants";
import { subscribeToEvent } from "@/common/socket";

const playlistsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // fetchPlaylists: build.query<PlaylistsResponse, FetchPlaylistsArgs>({
    fetchPlaylists: build.query({
      providesTags: ["Playlist"],
      query: (params: FetchPlaylistsArgs) => {
        // debugger;
        return {
          url: `/playlists`,
          params,
        };
      },
      /*
          query: () => {
          return{
            // method: 'get',
            url: `playlists`,
            params
          }
          },
  */

      /*responseSchema: playlistsResponseSchema,
      catchSchemaFailure: (error) => {
        // debugger;
        errorToast("Zod error. Details in the console", error.issues);
        return {
          status: "CUSTOM_ERROR",
          error: "Schema validation failed",
        };
    },*/
      ...withZodCatch(playlistsResponseSchema),
      //Время хранения данных в кэше, по умолчанию, составляет 60 секунд. Но это время можно настраивать с помощью keepUnusedDataFor(по умолчанию)
      keepUnusedDataFor: 0,
      //отменяет zod проверку
      // skipSchemaValidation: process.env.NODE_ENV === "production",

      /*
      // 🧩 Этот хук RTK Query вызывается, когда создаётся новый кэш-запрос.
      // Он позволяет "подписаться" на события в реальном времени и
      // вручную изменять кэшированные данные без повторных запросов.
      onCacheEntryAdded: async (
        _arg,
        {
          // cacheDataLoaded,
          updateCachedData,
          // dispatch,
          cacheEntryRemoved,
        },
      ) => {
        // debugger;
        //🧠 Ожидаем, пока запрос завершит загрузку данных в кэш.
        // cacheDataLoaded — промис, который резолвится, когда fetchPlaylists получает первый ответ от API.
        // const res = await cacheDataLoaded;
        // console.log(res); //{data: [{…}, {…}, {…}, {…}, {…}, {…}, {…}] meta : {page: 1, pageSize: 20, totalCount: 7, pagesCount: 1}}

        // 🌐 Создаём новое подключение к WebSocket-серверу через socket.io.
        // Это позволит получать обновления плейлистов в реальном времени.
        const socket = io(import.meta.env.VITE_SOCKET_URL, {
          path: "/api/1.0/ws", // путь, на котором сервер слушает WebSocket-подключения(по умолчанию socket.io)
          transports: ["websocket"], // используем только WebSocket без fallback на long polling
        });

        // debugger;
        // ✅ Лог в консоль, чтобы убедиться, что подключение установлено.
        socket.on("connect", () =>
          console.log("✅ Socket connected to server "),
        );

        //📡 Подписывается на событие "tracks.playlist-created", которое сообщает о создании нового плейлиста.
        // Сервер отправляет это событие, когда создаётся новый плейлист.
        socket.on(
          SOCKET_EVENTS.PLAYLIST_CREATED,
          (msg: PlaylistCreatedEvent) => {
            /// Из сообщения извлекаем новый объект плейлиста
            const newPlaylist = msg.payload.data;

            // 🧩 updateCachedData — специальная функция RTK Query,
            // которая позволяет безопасно изменять данные, хранящиеся в кэше.
            updateCachedData((state) => {
              // current(state) — утилита из Immer, позволяет получить «чистую» копию состояния для отладки
              const res = current(state);

              console.log(res);
              // Удаляем последний элемент списка, чтобы ограничить количество элементов на странице
              state.data.pop();
              // Добавляем новый плейлист в начало массива (новые — сверху)
              state.data.unshift(newPlaylist);
              // Увеличиваем общее количество элементов
              state.meta.totalCount += 1;
              // Пересчитываем количество страниц
              state.meta.pagesCount = Math.ceil(
                state.meta.totalCount / state.meta.pageSize,
              );
              // 🧠 Таким образом, UI сразу обновляется без повторного запроса к серверу.
              // debugger;
            });
            // ❌ Альтернатива — сбросить кэш по тегу, чтобы RTK Query заново загрузил данные:
            // dispatch(playlistsApi.util.invalidateTags(["Playlist"]));
          },
        );

        // 🚪 Ожидаем, пока кэш этого запроса перестанет использоваться (компонент размонтируется или данные устареют).
        // Когда это произойдёт — RTK Query автоматически вызовет этот await,
        // и можно будет безопасно закрыть WebSocket (чтобы не держать открытые соединения).
        await cacheEntryRemoved;

        socket.on("disconnect", () => {
          console.log("❌ Connection destroyed " + socket.connected);
        });
      },
*/

      onCacheEntryAdded: async (
        _arg,
        { cacheDataLoaded, updateCachedData, cacheEntryRemoved },
      ) => {
        await cacheDataLoaded;

        const unsubscribes = [
          subscribeToEvent<PlaylistCreatedEvent>(
            SOCKET_EVENTS.PLAYLIST_CREATED,
            (msg) => {
              // console.log("1");
              const newPlaylist = msg.payload.data;

              updateCachedData((state) => {
                state.data.pop();
                state.data.unshift(newPlaylist);
                state.meta.totalCount += 1;
                state.meta.pagesCount = Math.ceil(
                  state.meta.totalCount / state.meta.pageSize,
                );
              });
            },
          ),
          subscribeToEvent<PlaylistUpdatedEvent>(
            SOCKET_EVENTS.PLAYLIST_UPDATED,
            (msg) => {
              // console.log("1");
              const updatedPlaylist = msg.payload.data;
              const playlistId = updatedPlaylist.id;
              // debugger;
              updateCachedData((state) => {
                // debugger;
                const index = state.data.findIndex((p) => p.id === playlistId);
                if (index !== -1)
                  state.data[index] = {
                    ...state.data[index],
                    ...updatedPlaylist,
                  };
              });
            },
          ),
        ];

        /*
        const unsubscribe = subscribeToEvent<PlaylistCreatedEvent>(
          SOCKET_EVENTS.PLAYLIST_CREATED,
          (msg) => {
            // console.log("1");
            const newPlaylist = msg.payload.data;

            updateCachedData((state) => {
              state.data.pop();
              state.data.unshift(newPlaylist);
              state.meta.totalCount += 1;
              state.meta.pagesCount = Math.ceil(
                state.meta.totalCount / state.meta.pageSize,
              );
            });
          },
        );

        const unsubscribe2 = subscribeToEvent<PlaylistUpdatedEvent>(
          SOCKET_EVENTS.PLAYLIST_UPDATED,
          (msg) => {
            // console.log("1");
            const updatedPlaylist = msg.payload.data;
            const playlistId = updatedPlaylist.id;
            // debugger;
            updateCachedData((state) => {
              // debugger;
              const index = state.data.findIndex((p) => p.id === playlistId);
              if (index !== -1)
                state.data[index] = {
                  ...state.data[index],
                  ...updatedPlaylist,
                };
            });
          },
        );
*/

        await cacheEntryRemoved;
        unsubscribes.forEach((unsubscribe) => unsubscribe());
        /*
        unsubscribe();
        // console.log("6");
        unsubscribe2();
*/
      },
    }),
    // createPlaylists: build.mutation<PlaylistCreateResponse, CreatePlaylistArgs>(
    createPlaylists: build.mutation({
      invalidatesTags: ["Playlist"],
      query: (body: CreatePlaylistArgs) => ({
        method: "post",
        url: `/playlists`,
        body,
      }),
      /*      responseSchema: playlistCreateResponseSchema,
      catchSchemaFailure: (error) => {
        // debugger;
        errorToast("Zod error. Details in the console", error.issues);
        return {
          status: "CUSTOM_ERROR",
          error: "Schema validation failed",
        };
      },*/
      ...withZodCatch(playlistCreateResponseSchema),
    }),
    removePlaylists: build.mutation<void, string>({
      invalidatesTags: ["Playlist"],
      query: (playlistId) => ({
        method: "delete",
        url: `/playlists/${playlistId}`,
      }),
    }),
    updatePlaylists: build.mutation<
      void,
      { playlistId: string; body: UpdatePlaylistArgs }
    >({
      query: ({ playlistId, body }) => {
        // debugger
        // console.log('4')
        return {
          method: "put",
          url: `/playlists/${playlistId}`,
          body,
        };
      },
      onQueryStarted: async (
        { playlistId, body },
        { queryFulfilled, dispatch, getState },
      ) => {
        //Получает все аргументы ({search, pageNumber, pageSize}), с которыми в кеше есть результаты для fetchPlaylists.
        const args = playlistsApi.util.selectCachedArgsForQuery(
          getState(),
          "fetchPlaylists",
        );
        console.log(args); //хотя меняем на 2-ой странице
        //[
        // 0 : {search: '', pageNumber: 2, pageSize: 2}
        // 1 : {search: '', pageNumber: 3, pageSize: 2}
        // 2 : {search: '', pageNumber: 4, pageSize: 2}
        // 3 : {search: '', pageNumber: 5, pageSize: 2}
        // 4 : {search: '', pageNumber: 6, pageSize: 2}
        // 5 : {search: '', pageNumber: 7, pageSize: 2}
        // 6 : {search: '', pageNumber: 1, pageSize: 2}
        //]
        // debugger

        // console.log('1')

        // @ts-expect-error temporary patch type
        const patchCollections = [];

        args.forEach((arg) => {
          patchCollections.push(
            dispatch(
              playlistsApi.util.updateQueryData(
                "fetchPlaylists",
                {
                  search: arg.search,
                  pageNumber: arg.pageNumber,
                  pageSize: arg.pageSize,
                },
                (state) => {
                  // console.log('2')
                  /*
                                // ❌ ERROR: logs the Proxy-wrapped data
                                console.log(state)
                                // ✅ CORRECT: logs a plain JS copy of the current data
                                console.log(current(state))
                  */
                  const myState = current(state);
                  console.log(myState);
                  // debugger
                  const index = state.data.findIndex(
                    (playlist) => playlist.id === playlistId,
                  );
                  if (index !== -1) {
                    state.data[index].attributes = {
                      ...state.data[index].attributes,
                      ...body,
                    };
                  }
                  // debugger
                },
              ),
            ),
            // debugger
          );
        });

        /*
          const patchCollection = dispatch(
            playlistsApi.util.updateQueryData('fetchPlaylists', {
              search: args[0].search,
              pageNumber: args[0].pageNumber,
              pageSize: args[0].pageSize
            }, (state) => {
              // console.log('2')
              /!*
                            // ❌ ERROR: logs the Proxy-wrapped data
                            console.log(state)
                            // ✅ CORRECT: logs a plain JS copy of the current data
                            console.log(current(state))
              *!/
              const index = state.data.findIndex(playlist => playlist.id === playlistId)
              if (index !== -1) {
                state.data[index].attributes = {...state.data[index].attributes, ...body}
              }
              // debugger
            }),
          )
          // debugger
          */

        // @ts-expect-error temporary patch type
        console.log(patchCollections);
        //[
        // { inversePatches : [] patches : [] undo : () => {…} }
        // { inversePatches : [] patches : [] undo : () => {…} }
        // ]
        try {
          // console.log('3')
          await queryFulfilled;
          // console.log('5 success')
        } catch {
          // patchCollection.undo()
          // console.log('5 error')
          // @ts-expect-error temporary patch type
          patchCollections.forEach((patchCollection) => {
            patchCollection.undo();
          });
        }
      },
      invalidatesTags: ["Playlist"],
    }),
    // uploadPlaylistsCover: build.mutation<
    //   Images,
    //   { playlistId: string; file: File }>
    uploadPlaylistsCover: build.mutation({
      invalidatesTags: ["Playlist"],
      query: ({ playlistId, file }: { playlistId: string; file: File }) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          method: "post",
          url: `/playlists/${playlistId}/images/main`,
          body: formData,
        };
      },
      /*
      responseSchema: imagesSchema,
      catchSchemaFailure: (error) => {
        // debugger;
        errorToast("Zod error. Details in the console", error.issues);
        return {
          status: "CUSTOM_ERROR",
          error: "Schema validation failed",
        };
      },

*/
      ...withZodCatch(playlistsResponseSchema),
    }),
    removePlaylistsCover: build.mutation<void, { playlistId: string }>({
      invalidatesTags: ["Playlist"],
      query: ({ playlistId }) => ({
        method: "delete",
        url: `/playlists/${playlistId}/images/main`,
      }),
    }),
  }),
});
export default playlistsApi;

export const {
  useFetchPlaylistsQuery,
  useCreatePlaylistsMutation,
  useRemovePlaylistsMutation,
  useUpdatePlaylistsMutation,
  useUploadPlaylistsCoverMutation,
  useRemovePlaylistsCoverMutation,
} = playlistsApi;
