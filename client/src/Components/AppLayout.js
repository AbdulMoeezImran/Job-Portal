import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "@/Redux/slice"; // Assuming this is correctly imported
import NavBar from "@/Components/NavBar";
import Loader from "@/Components/Loader";
import { useRouter } from "next/router";

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const userPending = useSelector(state => state.user.userPending);
  const userInfo = useSelector(state => state.user.userInfo);
  const router = useRouter();
  const location = router.pathname;
  const pathParts = location.split("/").filter(Boolean);
  const shouldRedirect =
    pathParts[1] === "login" ||
    pathParts[1] === "register" ||
    pathParts[1] === "forget-password";

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  useEffect(() => {
    if (userInfo && shouldRedirect) {
      router.push("/");
    }
  }, [userInfo]);

  return (
    <>
      {userPending ? (
        <Loader />
      ) : (
        <>
          <NavBar />
          {children}
        </>
      )}
    </>
  );
};

export default AppLayout;
