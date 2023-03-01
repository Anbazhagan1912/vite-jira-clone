import React from "react";
import { useForm } from "@mantine/form";
import axios from "axios";
import { Select, TextInput } from "@mantine/core";
import { MultiSelect } from "@mantine/core";
import { Button } from "@mantine/core";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import { useEffect } from "react";
const CreateTeam = () => {
  const [value, setValue] = useState<string[]>([]);
  console.log(value);
  const [Users, SetUser] = useState([]);
  const [Projectid, setProjectId] = useState("");
  const [Project, setProject] = useState([]);
  console.log(Projectid);
  const form = useForm({
    initialValues: {
      teamName: "",
    },
  });
  //192.168.16.129:4445/user/teams/assigning
  const FeatchProjects = async () => {
    try {
      const responce = await axios.get(`http://192.168.16.129:4445/all`);
      const result = responce.data.data;
      const arr: any = [];
      result.forEach((el: any) => {
        arr.push({ value: el.id, label: el.title });
      });
      setProject(arr);
    } catch (err) {}
  };
  const FeatchUsers = async () => {
    try {
      const responce = await axios.get(
        `http://192.168.16.129:4445/user/all/name`
        // {
        //   //   headers: {
        //   //     Authorization: `Bearer ${localStorage.getItem("token")}`,
        //   //   },
        // }
      );

      const result = responce.data.data;
      console.log(result);
      const arr: any = [];
      result.forEach((el: any) => {
        arr.push({ value: el.id, label: el.userName });
      });
      console.log(arr);
      SetUser(arr);
    } catch (err) {
      console.log(err);
    }
  };
  const onSubmit = async (values: typeof form.values) => {
    try {
      const responce = await axios.post(
        `http://192.168.16.129:4445/user/teams/assigning`,
        {
          username: value,
          teamName: values.teamName,
          projectId: Projectid,
        }
      );

      console.log(responce);
      showNotification({
        title: "Success",
        message: "Created",
        color: "green",
      });
    } catch (err) {
      console.log(err);
      showNotification({
        title: "Error",
        message: "Failed",
        color: "red",
      });
    }
  };

  useEffect(() => {
    FeatchUsers();
    FeatchProjects();
  }, []);
  return (
    <div>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Select
          data={Project}
          onChange={() => setProjectId}
          label={"Project name"}
        ></Select>
        <MultiSelect
          onChange={setValue}
          value={value}
          label={"User Name"}
          data={Users}
        ></MultiSelect>
        <TextInput
          {...form.getInputProps("teamName")}
          label="TeamName"
        ></TextInput>
        <Button type="submit" className="text-[12px] mt-2">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreateTeam;
