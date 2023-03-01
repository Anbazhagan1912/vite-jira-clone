import React from "react";
import { IconLogout, IconPackage } from "@tabler/icons";
import { IconUserSearch } from "@tabler/icons";
import { IconPackgeImport } from "@tabler/icons";
import { Link } from "react-router-dom";
import CreateTask from "./CreateTask";
import CreateTeam from "./CreateTeam";
import { useState } from "react";
import { Modal } from "@mantine/core";
import { Tooltip } from "@mantine/core";
import { IconEdit } from "@tabler/icons";
import CreateProject from "./CreateProject";
const Nav = () => {
  const [project, Setproject] = useState<boolean>(false);
  const [opened, setOpened] = useState<boolean>(false);
  const [Team, setTeam] = useState<boolean>(false);
  const role = localStorage.getItem("role");

  return (
    <div
      className=" w-[30px] flex flex-col h-screen justify-center items-center items-start p-3 bg-bluebg
    "
    >
      {/* <div className="absolute top-[5%] left-[5%]  text-xs ">
      </div> */}
      <div className="mb-[150px] ">
        <div className="flex justify-center items-center cursor-pointer mb-[10px] text-[14px]">
          <Tooltip label={"Projects"} position="right" withArrow>
            <Link className=" m-4 text-white no-underline" to={"/Main"}>
              <IconPackage size={18} className="text-white"></IconPackage>
            </Link>
          </Tooltip>
        </div>
        {role === "Admin" ? (
          <div className="flex justify-center items-center cursor-pointer  mb-[10px]  text-[14px]">
            <Tooltip label={"Users"} position="right" withArrow>
              <Link className=" m-4 text-white no-underline" to={"/Users"}>
                <IconUserSearch
                  size={18}
                  className="text-white"
                ></IconUserSearch>
              </Link>
            </Tooltip>
          </div>
        ) : null}
        <div className="flex justify-center items-center cursor-pointer  mb-[10px]  text-[14px]">
          <Tooltip label={"Create Project"} position="right" withArrow>
            <Link
              onClick={() => {
                Setproject(true);
              }}
              className=" m-4 text-white no-underline"
              to={"/Main"}
            >
              <IconPackgeImport
                size={18}
                className="text-white"
              ></IconPackgeImport>
            </Link>
          </Tooltip>
        </div>
        <div className="flex justify-center items-center cursor-pointer  mb-[10px]  text-[14px]">
          <Tooltip label={"Create Task"} position="right" withArrow>
            <Link
              onClick={() => {
                setOpened(true);
              }}
              className=" m-4 text-white no-underline"
              to={"/Main"}
            >
              <IconEdit size={18} className="text-white"></IconEdit>
            </Link>
          </Tooltip>
        </div>
        <div className="flex justify-center items-center cursor-pointer  mb-[10px]  text-[14px]">
          <Tooltip label={"Create Team"} position="right" withArrow>
            <IconEdit
              onClick={() => {
                setTeam(true);
              }}
              size={18}
              className="text-white"
            ></IconEdit>
          </Tooltip>
        </div>
      </div>
      <div className="flex  absolute bottom-10 cursor-pointer justify-center items-center text-[14px]">
        <Tooltip label={"Logout "} position="right" withArrow>
          <Link className="m-4 text-white no-underline" to={"/"}>
            <IconLogout size={18} className="text-white"></IconLogout>
          </Link>
        </Tooltip>
      </div>
      <Modal
        size="55%"
        opened={project}
        onClose={() => Setproject(false)}
        title="Create Project"
      >
        <CreateProject></CreateProject>
      </Modal>

      <Modal
        size="35%"
        overlayOpacity={0.55}
        overlayBlur={3}
        // position="right"
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create Task    "
        padding="xl"
        className="p-[40px]"
      >
        <CreateTask></CreateTask>
        {/* <Createteam></Createteam> */}
      </Modal>
      <Modal
        size="35%"
        overlayOpacity={0.55}
        overlayBlur={3}
        // position="right"
        opened={Team}
        onClose={() => setTeam(false)}
        title="Create Team"
        padding="xl"
        className="p-[40px]"
      >
        {/* <CreateTask></CreateTask> */}
        <CreateTeam></CreateTeam>
      </Modal>
    </div>
  );
};

export default Nav;
