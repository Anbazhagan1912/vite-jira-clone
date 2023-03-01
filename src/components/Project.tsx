import { Table } from "@mantine/core";
import axios from "axios";
import { Route, Routes } from "react-router-dom";

import React, { useEffect } from "react";
import { Pagination } from "@mantine/core";
import { useState } from "react";
import ProjectTabel from "./ProjectTabel";
export const Project = ({ search }: string | any) => {
  const [activePage, setPage] = useState(1);

  const [Page, SetPage] = useState<any>({
    totalPage: 0,
    from: 0,
    to: 0,
    totalCount: 0,
  });
  const [projectList, setProjectlist] = useState<any>([]);
  const featchProject = async () => {
    try {
      const responce = await axios.get(
        `http://192.168.16.129:4445/projects/all?search=${search}&page=${activePage}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(activePage);
      const result = responce.data.data;
      SetPage((pre: any) => ({
        ...pre,
        from: responce.data.from,
        to: responce.data.to,
        totalCount: responce.data.totalCount,
        totalPage: responce.data.totalPages,
      }));
      setProjectlist(result);
    } catch (err) {
      console.log(err);
    }
  };
  projectList.forEach((el: any, i: number) => {
    let isoDateTime = new Date(el.createdAt);
    let localDate = isoDateTime.toLocaleDateString();
    let localTime = isoDateTime.toLocaleTimeString();
    projectList[i].date = localDate + "  " + localTime;
  });
  console.log(Page);
  useEffect(() => {
    featchProject();
  }, [activePage, search]);
  return (
    <div>
      <div>
        <ProjectTabel result={projectList}></ProjectTabel>
        <Pagination
          size={"xs"}
          onChange={setPage}
          page={activePage}
          color={"cyan"}
          className="text-[10px] absolute bottom-3 right-4 "
          total={Page.totalPage}
        ></Pagination>
        <Routes></Routes>
      </div>
    </div>
  );
};
