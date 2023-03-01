import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Main from "./components/Main";
import Task from "./components/Task";
import { State } from "./components/atom";
import { useRecoilValue } from "recoil";
import { NotificationsProvider } from "@mantine/notifications";
import Users from "./components/Users";
import ProductedRoute from "./components/ProductedRoute";
const App = () => {
  const val = useRecoilValue(State);
  console.log(val);
  return (
    <NotificationsProvider>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HomePage />
            </>
          }
        ></Route>
        <Route
          path="/Main"
          element={
            <ProductedRoute isLogin={val}>
              <Main></Main>
            </ProductedRoute>
          }
        ></Route>
        <Route
          path="/Task/:id"
          element={
            <ProductedRoute isLogin={val}>
              <Task></Task>
            </ProductedRoute>
          }
        ></Route>
        `
        <Route
          path="/Users"
          element={
            <ProductedRoute isLogin={val}>
              <Users></Users>
            </ProductedRoute>
          }
        ></Route>
      </Routes>
    </NotificationsProvider>
  );
};

export default App;
