import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { store } from "@/Redux/store";
import NavBar from "@/Components/NavBar";
import { getRequest } from "@/GlobalFunctions/ApiRequest";
import { useEffect, useState } from "react";
import { InfinitySpin } from "react-loader-spinner";

export default function App({ Component, pageProps }) {
  const [gettingUser, setGettingUser] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

  const getUser = async () => {
    try {
      const data = await getRequest("/auth/userInfo");
      setUserInfo(data);
    } catch (error) {
      console.error(error);
    } finally {
      setGettingUser(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Provider store={store}>
      {gettingUser ? (
        <div className="bg-gray w-full h-screen flex items-center flex-col justify-center">
          <InfinitySpin width="200" color="#4f46e5" />
          <p className="text-xs uppercase">Loading Resources Hold Tight...</p>
        </div>
      ) : (
        <>
          <NavBar userInfo={userInfo} />
          <Component {...pageProps} getUser={getUser} />
        </>
      )}

      <ToastContainer />
    </Provider>
  );
}
