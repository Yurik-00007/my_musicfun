// import {Routing} from "@/common/routing/Routing.tsx";
import {Routing} from "@/common/routing";
import {Header, LinearProgress} from "@/common/components";
import s from './App.module.css'
import {Bounce, ToastContainer} from "react-toastify";
import {useGlobalLoading} from "@/common/hooks";

function App() {

  const isGlobalLoading =useGlobalLoading()

  return (
    <>
      <Header/>
      {isGlobalLoading && <LinearProgress/>}
      <div className={s.layout}>
        <Routing/>
      </div>
      <ToastContainer position="bottom-right"
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={false}
                      closeOnClick={false}
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="colored"
                      transition={Bounce} />
    </>
  )
}

export default App
