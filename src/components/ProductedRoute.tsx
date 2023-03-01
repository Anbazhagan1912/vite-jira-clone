import { Navigate } from "react-router-dom";

const ProductedRoute = ({ isLogin, children }: any) => {
  if (isLogin === false) {
    return <Navigate to={"/"} replace></Navigate>;
  } else {
    return children;
  }
};

export default ProductedRoute;
