import { IconSignLeft } from "@tabler/icons";
import { Button, Grid, Select, Pagination, TextInput } from "@mantine/core";
// import Router from "next/router";
import { Menu } from "@mantine/core";
import { Avatar } from "@mantine/core";
// import { useRouter } from "next/router";
// import Nav from "@/components/Nav";
import { IconFileText } from "@tabler/icons";
import { useParams } from "react-router-dom";
import Nav from "./Nav";
import { Modal } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
// import { u?serState } from "@/components/Helper/atom";
// import { us?eRecoilValue } from "recoil";
import { useForm } from "@mantine/form";
import { Link } from "react-router-dom";
import TaskTabel from "./TaskTabel";
import { IconLogout } from "@tabler/icons";
function Task() {
  const [opened, setOpened] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id }: any | null = useParams();
  const index = parseInt(id);
  //   console.
  console.log(id);
  //   const Recoilvalue = useRecoilValue(userState);

  const [Task, SetTask] = useState({
    user: [],
    value1: "",
    TotalPage: 1,
    Result: [],
    Statusid: "0",
    Typeid: "0",
    Userid: 0,
    Search: "",
    value: "",
    from: 0,
    to: 0,
    totalCount: 0,
  });
  const [user, Setuser] = useState([]);

  const [activePage, setPage] = useState(1);

  const form = useForm({
    initialValues: {
      status: "",
      type: "",
      userid: 0,
    },
  });

  //   const router = useRouter();
  //   let { index }: any | null = router.query;

  const FeatchTask = async () => {
    try {
      const responce = await axios.get(
        `http://192.168.16.129:4445/project/task/${index}/?typeId=${Task.Typeid}&statusId=${Task.Statusid}&userId=${Task.Userid}&page=${activePage}&search=${Task.Search}`
      );

      const result = responce.data.data;
      SetTask((Pre: any) => ({
        ...Pre,
        Result: result,
        TotalPage: responce.data.pages,
        from: responce.data.from,
        to: responce.data.to,
        totalCount: responce.data.totalcount,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const FetchUser = async () => {
      const responce = await axios.get(
        "http://192.168.16.129:4445/user/all/name",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const result = responce.data.data;
      let data1: any = [{ value: 0, label: "All" }];

      result.forEach((el: any) => {
        data1.push({ value: el.id, label: el.userName });
        Setuser(data1);
      });
    };
    FeatchTask();
    FetchUser();
  }, [index, activePage, Task.Search, Task.Userid, Task.Typeid, Task.Statusid]);

  return (
    <div className={"flex relative"}>
      <Grid>
        <Grid.Col span={1}>
          <Nav></Nav>
        </Grid.Col>
        <Grid.Col span={11}>
          <div className=" absolute top-[-2%] left-[-14%] w-screen flex flex-col justify-between">
            <h1
              onClick={() => navigate("/Main")}
              style={{ cursor: "pointer", color: "#228be6" }}
              className="ml-10 absolute flex   left-60 mt-[40px] text-xl uppercase text-bluebg font-semibold"
            >
              <IconSignLeft className="text-bluebg"></IconSignLeft>{" "}
              <p className="text-bluebg">Task</p>
            </h1>

            <div className="absolute mt-[20px] right-[-9%] flex float-right p-3">
              <TextInput
                value={Task.Search}
                onChange={(event) => {
                  if (event.target.value.length > 0) {
                    SetTask((pre) => ({
                      ...pre,
                      Search: event.target.value,
                    }));
                  } else {
                    SetTask((pre) => ({
                      ...pre,
                      Search: event.target.value,
                    }));
                  }
                }}
                placeholder="search title"
              ></TextInput>

              <div className="absolute right-[-22%] top-[-2%] ml-[10px]">
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <Avatar size={60}></Avatar>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Label>{localStorage.getItem("username")}</Menu.Label>
                    <Menu.Item color={"red"} icon={<IconLogout size={14} />}>
                      <Link to={"/"} className="no-underline text-red-600">
                        Logout
                      </Link>
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </div>
            </div>
            <div className="absolute top-20  left-72 ">
              <div className="flex">
                <form
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "400px",
                  }}
                  onSubmit={form.onSubmit((val) => {
                    const status = val.status === "" ? "0" : val.status;
                    const type = val.type === "" ? "0" : val.type;
                    SetTask((pre: any) => ({
                      ...pre,
                      Typeid: type,
                      Statusid: status,
                      Userid: val.userid,
                    }));

                    FeatchTask();
                  })}
                >
                  <Select
                    className="w-52 mr-2"
                    label="Type"
                    placeholder="Select Type"
                    defaultValue={"All"}
                    {...form.getInputProps("type")}
                    data={[
                      { value: "0", label: "All" },
                      { value: "1", label: "Task" },
                      { value: "2", label: "Bug" },
                    ]}
                  ></Select>
                  <Select
                    label="Status"
                    className="w-52 mr-2"
                    // defaultValue=[{label:"All"}]
                    {...form.getInputProps("status")}
                    searchable
                    defaultValue={"All"}
                    placeholder="Select Type"
                    data={[
                      { value: "0", label: "All" },
                      { value: "1", label: "To Do" },
                      { value: "2", label: "InProgess" },
                      { value: "3", label: "Reopen" },
                      { value: "4", label: "Done" },
                    ]}
                  ></Select>
                  <Select
                    searchable
                    label="users"
                    {...form.getInputProps("userid")}
                    placeholder="username"
                    data={user}
                  ></Select>
                  <Button
                    color={"cyan"}
                    className="ml-2 text-xs"
                    style={{ marginTop: "25px" }}
                    type="submit"
                    onClick={() => setPage(1)}
                  >
                    Search
                  </Button>
                </form>
              </div>
            </div>
          </div>
          {/* <TaskTabel
            from={Task.from}
            to={Task.to}
            totalCount={Task.totalCount}
            totalPage={Task.TotalPage}
            id={1}
            page={activePage}
            result={Task.Result}
          ></TaskTabel> */}
          <TaskTabel
            from={Task.from}
            to={Task.to}
            totalCount={Task.totalCount}
            totalPage={Task.TotalPage}
            id={1}
            page={activePage}
            result={Task.Result}
          ></TaskTabel>
          <Pagination
            color={"cyan"}
            onChange={setPage}
            page={activePage}
            size="xs"
            className="text-sm fixed bottom-2 right-24"
            total={Task.TotalPage}
          ></Pagination>
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default Task;
