import { useState } from "react";
import Login from "./components/Login";

const HomePage = () => {
  return (
    <div className=" bg-cover bg-center bg-[url('src/assets/img.jpg')] flex justify-evenly items-center h-screen">
      <h1 className="text-white text-3 xl p-4">
        Sterna Security Devices <br></br>Pvt Ltd
      </h1>
      <div className="h-[500px] w-[3px] bg-white"></div>
      <Login></Login>
    </div>
  );
};

export default HomePage;
