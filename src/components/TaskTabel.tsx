import { Table } from "@mantine/core";
import { IconWash } from "@tabler/icons";
import React, { useEffect } from "react";
import { Badge } from "@mantine/core";
import { useState } from "react";
import { Modal } from "@mantine/core";
import { saveAs } from "file-saver";

import { IconBug } from "@tabler/icons";
import UpdateTask from "./TaskUpdate";
// import useDownloader from "react-use-downloader";

const TaskTabel = ({
  from,
  to,
  totalCount,
  totalPage,
  id,
  result,
  page,
}: any) => {
  const role = localStorage.getItem("role");

  const [Taskname, SetTaskName] = useState<string>("");
  const [Update, Setupdate] = useState<boolean>(false);
  const [Description, SetDescription] = useState<string>("");
  const [Taskid, SetTaskId] = useState<number>(0);

  const [Status, SetStatus] = useState<string>("");

  const ths = (
    <tr>
      <th>S.no</th>
      <th>Type</th>
      <th>Title</th>
      <th>Description</th>
      <th>Status</th>
      <th>Assignee</th>
      <th>Action</th>
    </tr>
  );

  const rows = result.map((element: any, index: any) => (
    <tr key={element.id}>
      <td>{page * 10 - 10 + (index + 1)}</td>
      <td className="flex text-[10px] justify-center items-center">
        <Badge color={element.type.type === "Bug" ? "red" : "blue"}>
          {element.type.type === "Bug" ? (
            <IconBug className="mr-1" size={14}></IconBug>
          ) : (
            <IconWash className="mr-1" size={14}></IconWash>
          )}
          {element.type.type}
        </Badge>
      </td>
      <td
        onClick={() => {
          role === "Admin" ? Setupdate(true) : Setupdate(false);
          SetTaskName(element.title);
          SetTaskId(element.id);
          SetDescription(element.description);
          SetStatus(element.status);
        }}
        className="cursor-pointer  "
      >
        {element.title}
      </td>
      <td className="text-[12px] cursor-pointer ">
        {element.description.length > 10 ? "None" : element.description}
      </td>
      <td>
        {" "}
        <Badge
          color={
            element.status.type === "To Do"
              ? "cyan"
              : element.status.type === "Done"
              ? "green"
              : element.status.type === "Reopen"
              ? "red"
              : "blur"
          }
        >
          {element.status.type}
        </Badge>
      </td>

      <td>{<Badge color="cyan">{element.taskAssigned.userName}</Badge>}</td>
      <td>
        {
          <Badge
            className="cursor-pointer"
            color="red"
            onClick={() => {
              console.log(element.image);
              element.image.forEach((el: any) => {
                // download(el.imagePath, "Image");
                saveAs(el.imagePath, "Twitter-logo");
              });
              // const URL = element.image[element.image.length - 1].imagePath;
              // if (typeof window !== "undefined") {
              //   window.location.href = URL;
              // }
            }}
          >
            Image
          </Badge>
        }
      </td>
    </tr>
  ));
  return (
    <div className="absolute top-[18%] left-[5%] mr-10 mb-[200px] ">
      <Table
        striped
        withBorder
        withColumnBorders
        className=" cursor-pointer"
        horizontalSpacing={65}
        verticalSpacing={13}
        captionSide="bottom"
      >
        <caption className="text-start mt-2">{`from ${from} to ${to} total ${totalCount} `}</caption>
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
      </Table>

      <Modal
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={Update}
        onClose={() => Setupdate(false)}
        title="Update Task "
        padding="xl"
      >
        <UpdateTask
          status={Status}
          description={Description}
          projectId={id}
          title={Taskname}
          id={Taskid}
        ></UpdateTask>
      </Modal>
    </div>
  );
};
export default TaskTabel;
