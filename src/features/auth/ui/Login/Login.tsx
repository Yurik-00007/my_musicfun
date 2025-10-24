import { useLoginMutation } from "@/features/auth/api/authApi.ts";
import { Path } from "@/common/constants";

const Login = () => {
  // debugger
  const [login] = useLoginMutation();

  //OAUTH
  const loginHandler = () => {
    // debugger
    // const redirectUri='http://localhost:5173/oauth/callback'
    const redirectUri =
      import.meta.env.VITE_DOMAIN_ADDRESS + Path.OAuthRedirect;

    ///Эти данные берутся с swagger: url(/auth/oauth-redirect) и Parameters(get->parameters->?callbackUrl=XXX) auth/oauth-redirect?callbackUrl=
    //https://musicfun.it-incubator.app/api/1.0/auth/oauth-redirect?callbackUrl=http://localhost:5173/oauth/callback
    const url = `${import.meta.env.VITE_BASE_URL}/auth/oauth-redirect?callbackUrl=${redirectUri}`;

    //открыть окно: url, name, size
    window.open(url, "oauthPopup", "width=200, height=300");

    // Сюда возвращается из <OAuthCallback/>
    // window.opener.postMessage({ code }, '*') и поподает в event
    const receiveMessage = (e: MessageEvent) => {
      //e:{
      // isTrusted : true
      // bubbles : false
      // cancelBubble : false
      // cancelable : false
      // composed : false
      // currentTarget : Window {window: Window, self: Window, document: document, name: '', location: Location, …}
      // data : {source: 'react-devtools-bridge', payload: {…}}
      // defaultPrevented : false
      // eventPhase : 2
      // lastEventId : ""
      // origin : "http://localhost:5173"
      // ports : []
      // returnValue : true
      // source : Window {window: Window, self: Window, document: document, name: '', location: Location, …}
      // srcElement : Window {window: Window, self: Window, document: document, name: '', location: Location, …}
      // target : Window {window: Window, self: Window, document: document, name: '', location: Location, …}
      // timeStamp : 1263268.5
      // type : "message"
      // userActivation : null
      // }

      // debugger
      if (e.origin !== import.meta.env.VITE_DOMAIN_ADDRESS) return;

      const { code } = e.data;
      if (!code) {
        return;
      }

      window.removeEventListener("message", receiveMessage);

      login({
        code,
        redirectUri,
        rememberMe: false,
      });
    };

    window.addEventListener("message", receiveMessage);
  };

  return (
    <div>
      <button type={"button"} onClick={loginHandler}>
        Login
      </button>
    </div>
  );
};

export default Login;
