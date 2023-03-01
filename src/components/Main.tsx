import Nav from "./Nav";
import { State } from "./atom";
import { Project } from "./Project";
import TaskBar from "./TaskBar";
import { useState } from "react";
const Main = () => {
  const [search, setSearch] = useState("");
  const SearchHandeler = (val: any) => {
    setSearch(val);
  };
  return (
    <div className="flex">
      <Nav></Nav>
      <div>
        <TaskBar setSearch={SearchHandeler}></TaskBar>
        <Project search={search}></Project>
      </div>
    </div>
  );
};

export default Main;
