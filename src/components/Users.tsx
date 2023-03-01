// import Nav from "@/components/Nav";
import Nav from "./Nav";
import axios from "axios";
import { Button } from "@mantine/core";
import { TextInput } from "@mantine/core";
import { Grid } from "@mantine/core";
// import { IconPlaylistAdd } from "@tabler/icons";
import { IconUserPlus } from "@tabler/icons";
import UserTabel from "./UsersTabel";
import { useEffect } from "react";
import { Modal } from "@mantine/core";
import { useState } from "react";
import AddUser from "./AddUser";
// import UserList from "@/components/UserList";
const Users = () => {
  const [Adduser, setAddUser] = useState<boolean>(false);

  const [Page, setPage] = useState<number>(1);
  const [Filter, setFilter] = useState<string>("");
  const [val, setVal] = useState<string>("");
  const HandelPage = (val: number) => {
    setPage(val);
  };
  // const [totalpage, settotalpage] = useState(1);
  const [Pages, SetPage] = useState({
    from: 0,
    to: 0,
    totalCount: 0,
    totalPage: 0,
  });
  const [user, Setuser] = useState([]);

  useEffect(() => {
    const FeatchUsers = async (page: number) => {
      try {
        const responce = await axios.get(
          `http://192.168.16.129:4445/user/all?page=${Page}&search=${Filter}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(responce);
        Setuser(responce.data.data);
        SetPage((Pre: any) => ({
          from: responce.data.from,
          to: responce.data.to,
          totalCount: responce.data.totalCount,
          totalPage: responce.data.totalPages,
        }));
      } catch (err) {
        console.log(err);
      }
    };
    FeatchUsers(Page);
  }, [Page, Filter]);
  return (
    <div>
      <Grid>
        <Grid.Col span={3}>
          <Nav></Nav>
        </Grid.Col>
        <Grid.Col span={9}>
          <div className="flex absolute right-10 mt-2">
            <TextInput
              value={Filter}
              onChange={(event) => {
                if (event.currentTarget.value.length > 0) {
                  setVal(event.target.value);
                  setFilter(event.currentTarget.value);
                } else {
                  setFilter("");
                }
              }}
              placeholder="Search User"
            ></TextInput>
            <Button
              color={"cyan"}
              onClick={() => {
                setAddUser(true);
              }}
              className="ml-2 text-xs"
            >
              <IconUserPlus size={14}></IconUserPlus> Add User
            </Button>
          </div>
          <UserTabel
            page={Page}
            pageHandeler={HandelPage}
            total={Pages.totalPage}
            from={Pages.from}
            to={Pages.to}
            count={Pages.totalCount}
            list={user}
          ></UserTabel>
        </Grid.Col>
      </Grid>
      <Modal size="30%" opened={Adduser} onClose={() => setAddUser(false)}>
        <AddUser></AddUser>
      </Modal>
    </div>
  );
};

export default Users;
