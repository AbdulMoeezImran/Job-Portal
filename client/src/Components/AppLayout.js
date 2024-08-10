import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "@/Redux/slice"; // Assuming this is correctly imported
import NavBar from "@/Components/NavBar";
import Loader from "@/Components/Loader";
import { useRouter } from "next/router";

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const userPending = useSelector((state) => state.user.userPending);
  const userInfo = useSelector((state) => state.user.userInfo);
  const router = useRouter();
  const location = router.pathname;
  const pathParts = location.split("/").filter(Boolean);
  const isAuthPage =
    pathParts[1] === "login" ||
    pathParts[1] === "register" ||
    pathParts[1] === "forget-password";
  const isPostJobPage =
    pathParts[0] === "postajob" || pathParts[0] === "postedjobs";
  const isEmployerPage = pathParts[1] === "employer-setup";
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  // routes protecting
  useEffect(() => {
    if (!userPending) {
      if (!userInfo && pathParts.length !== 0 && !isAuthPage) {
        router.push("/auth/login");
      }

      // auth routes protecting
      if (userInfo && isAuthPage) {
        router.push("/");
      }

      // post job routes protecting
      if (userInfo && !userInfo.company && isPostJobPage) {
        router.push("/auth/employer-setup");
      }

      // employer route protecting
      if (userInfo && userInfo.company && isEmployerPage) {
        router.push("/postajob");
      }
    }
  }, [userPending, pathParts]);

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
