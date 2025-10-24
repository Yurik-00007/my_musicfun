// Компонент, срабатывающий после успешной OAuth авторизации,
// его цель - отправить код обратно в главное окно приложения и закрыть popup
import { useEffect } from "react";

export const OAuthCallback = () => {
  useEffect(() => {
    // debugger
    // Получаем текущий URL->
    // http://localhost:5173/oauth/callback?session_state=08cc1ec9-89f8-4469-8104-73c46f6c565e&iss=https%3A%2F%2Foauth.apihub.it-incubator.io%2Frealms%2Fapihub&code=3c86ba70-7f32-4da4-a963-6f26d7a6d0f2.08cc1ec9-89f8-4469-8104-73c46f6c565e.68b7bd8c-a269-4a12-9aaf-162d7dd4b893
    const url = new URL(window.location.href); //преобразуем в объект c полями

    // console.log(url.origin)      // "http://localhost:5173"
    // console.log(url.pathname)    // ""/oauth/callback""
    // console.log(url.search)      // "?session_state=08cc1ec9-89f8-4469-8104-73c46f6c565e&iss=https%3A%2F%2Foauth.apihub.it-incubator.io%2Frealms%2Fapihub&code=3c86ba70-7f32-4da4-a963-6f26d7a6d0f2.08cc1ec9-89f8-4469-8104-73c46f6c565e.68b7bd8c-a269-4a12-9aaf-162d7dd4b893"
    // console.log(url.searchParams.get('session_state'))   // "08cc1ec9-89f8-4469-8104-73c46f6c565e"
    // console.log(url.searchParams.get('iss')) // "https://oauth.apihub.it-incubator.io/realms/apihub"
    // console.log(url.searchParams.get('code')) // "3c86ba70-7f32-4da4-a963-6f26d7a6d0f2.08cc1ec9-89f8-4469-8104-73c46f6c565e.68b7bd8c-a269-4a12-9aaf-162d7dd4b893"
    // console.log(url.searchParams.get('page')) // null

    // Извлекаем code из параметров запроса
    //3c86ba70-7f32-4da4-a963-6f26d7a6d0f2.08cc1ec9-89f8-4469-8104-73c46f6c565e.68b7bd8c-a269-4a12-9aaf-162d7dd4b893
    const code = url.searchParams.get("code");

    if (code && window.opener) {
      // Отправляем сообщение обратно в event.data компонент <Login/>
      window.opener.postMessage({ code }, "*");
    }

    window.close();
  }, []);

  return <p>Logging you in...</p>;
};
