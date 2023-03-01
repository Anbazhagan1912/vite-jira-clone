import React from "react";
import { Route, Routes } from "react-router-dom";
import Task from "./Task";

import { Button, Table } from "@mantine/core";
import { Badge } from "@mantine/core";
import { useNavigate } from "react-router-dom";
const ProjectTabel = ({ result }: any) => {
  const navigate = useNavigate();
  const ths = (
    <tr>
      <th>S.no</th>
      <th>Title</th>
      <th>Description</th>
      <th>CreatedBy</th>
      <th>CreatedAt</th>
      <th>Action</th>
    </tr>
  );
  const row = result.map((el: any) => (
    <tr key={el.id + 2}>
      <td className=" ">{el.id}</td>

      <td className="">
        {el.title.length > 0 && el.title.length < 15
          ? el.title.charAt(0).toUpperCase() + el.description.slice(1)
          : "None"}
      </td>
      <td className="">
        {el.description.length > 0 && el.description.length < 15
          ? el.description.charAt(0).toUpperCase() + el.description.slice(1)
          : "None"}
      </td>
      <td className="">{el.createdBy}</td>
      <td className="">{el.date}</td>
      <td className="flex justify-center items-center">
        <Badge
          onClick={() => {
            navigate(`/Task/${el.id}`);
          }}
          className="text-[11px] w-[100px] p-3 "
          color={"cyan"}
        >
          View
        </Badge>
      </td>
    </tr>
  ));
  return (
    <div className=" mt-[30px]  ">
      <h1 className="text-2xl ml-[20px]  mb-[20px]">Project</h1>
      <Table
        className=" ml-[20px] cursor-pointer "
        verticalSpacing={14}
        horizontalSpacing={75}
        striped
        withBorder
        withColumnBorders
      >
        <thead>{ths}</thead>
        <tbody>{row}</tbody>
      </Table>
    </div>
  );
};

export default ProjectTabel;
