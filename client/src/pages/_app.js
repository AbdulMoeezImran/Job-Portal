import "@/styles/globals.scss";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "@/Redux/store";
import { ToastContainer } from "react-toastify";
import AppLayout from "@/Components/AppLayout";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
      <ToastContainer />
    </Provider>
  );
}
