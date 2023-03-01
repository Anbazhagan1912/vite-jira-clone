import React from "react";
import { Avatar } from "@mantine/core";
import { Button } from "@mantine/core";
import { TextInput } from "@mantine/core";
import { Menu } from "@mantine/core";
import { IconLogout, IconSearch, IconUser } from "@tabler/icons";
import { Link } from "react-router-dom";
const TaskBar = ({ setSearch }: any) => {
  return (
    <div className="absolute right-3 top-2 flex justify-center items-center">
      <div className="flex  ">
        <TextInput
          icon={<IconSearch size={14}></IconSearch>}
          placeholder="Search"
          onChange={(e) => {
            e.target.value !== "" ? setSearch(e.target.value) : setSearch("");
          }}
        ></TextInput>
        {/* <Button className="text-xs ml-2 bg-bluebg">Search</Button> */}
      </div>
      <div className="ml-[10px]">
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Avatar size={60}></Avatar>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>{`${localStorage.getItem(
              "username"
            )}(${localStorage.getItem("role")})`}</Menu.Label>
            <Menu.Item color={"red"} icon={<IconLogout size={14} />}>
              <Link to={"/"} className="no-underline text-red-600">
                Logout
              </Link>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </div>
  );
};

export default TaskBar;
