import React from "react";
// import Router from "next/router";
import { Pagination } from "@mantine/core";
import { IconSignLeft } from "@tabler/icons";
import { Modal } from "@mantine/core";
// import UserUpdate from "../components/UserUpdate";
import { Badge, Table } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import UserUpdate from "./UserUpdate";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
type data = {
  count: number;
  from: number;
  to: number;
  list: any;
  page: number;
  total: number;
  pageHandeler: any;
};
function UserTabel({ count, from, to, list, page, total, pageHandeler }: data) {
  const navigate = useNavigate();
  const [pageval, setpageval] = useState<number>(1);
  const [opened, setOpened] = useState<boolean>(false);
  const [User, SetUser] = useState({
    id: 0,
  });
  useEffect(() => {
    pageHandeler(pageval);
  }, [pageval]);
  const ths = (
    <tr>
      <th>S.no</th>
      <th>Username</th>
      <th>Role</th>
      <th>Email</th>
      <th>Phone Number</th>
    </tr>
  );

  const rows = list.map((element: any, index: number) => (
    <tr key={element.id}>
      <td className="text-xs">{page * 10 - 10 + (index + 1)}</td>
      <td
        onClick={() => {
          SetUser({
            id: element.id,
          });
          setOpened(true);
        }}
        className=" cursor-pointer text-xs"
      >
        {element.userName}
      </td>
      <td>
        {
          <Badge
            color={
              element.role === "Admin"
                ? "blue"
                : element.role === "User"
                ? "green"
                : "red"
            }
          >
            {element.role === "" ? "None" : element.role}
          </Badge>
        }
      </td>
      <td>{element.email === "" ? "None" : element.email}</td>
      <td>
        <span className="absolute">
          {element.phoneNumber === null || element.phoneNumber === ""
            ? "None"
            : element.phoneNumber}
        </span>
      </td>
    </tr>
  ));
  return (
    <div className="absolute left-[5%] mt-10">
      <h1
        onClick={() => {
          navigate("/Main");
        }}
        style={{ cursor: "pointer", color: "#228be6" }}
        className=" left-60 mb-5 text-xl text-bluebg uppercase flex font-semibold w-36"
      >
        <IconSignLeft className="text-bluebg"></IconSignLeft>{" "}
        <p className="text-bluebg">Users</p>
      </h1>
      <Table
        striped
        withBorder
        withColumnBorders
        horizontalSpacing={95}
        verticalSpacing={13}
        captionSide="bottom"
      >
        <caption className="text-start mt-2">{`Page form ${from} to ${to} total ${count}`}</caption>
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
      </Table>
      <Pagination
        size={"xs"}
        className="fixed right-20"
        total={total}
        page={pageval}
        onChange={setpageval}
      ></Pagination>
      <Modal
        overlayOpacity={0.55}
        overlayBlur={3}
        opened={opened}
        onClose={() => setOpened(false)}
        title="Update User "
        // padding="xl"
        className="p-[60px]"
      >
        <UserUpdate id={User.id}></UserUpdate>
      </Modal>
    </div>
  );
}

export default UserTabel;
