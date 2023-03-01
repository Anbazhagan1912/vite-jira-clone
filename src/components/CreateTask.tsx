import { useForm } from "@mantine/form";
import { Box } from "@mantine/core";
import { Button } from "@mantine/core";
import { Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { Textarea } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { FileInput } from "@mantine/core";
import { TextInput } from "@mantine/core";
import { IconUpload } from "@tabler/icons";
import axios from "axios";

const CreateTask = () => {
  const [value, setValue] = useState<File[] | any>([]);
  const createrid: any = localStorage.getItem("id");
  const [projects, setProjects] = useState<string[]>([]);
  const [users, setUsers] = useState<string[]>([]);

  async function onSubmit(values: typeof form.values) {
    try {
      const formData: any = new FormData();
      value.forEach((file: any) => {
        formData.append("files", file);
      });

      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("creatorId", +createrid);
      formData.append("projectId", values.projectname);
      formData.append("assigneeId", values.assigne);
      formData.append("type", values.type);
      const result = await axios.post(
        "http://192.168.16.129:4445/task/new",
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      let statusCode = result?.status ?? "";
      if (statusCode === 200 || statusCode == 201) {
        showNotification({
          title: "Success",
          message: `Task Created`,
          color: "green",
        });
      }
    } catch (error) {
      console.log(error);
      showNotification({
        title: "Error",
        color: "red",
        message: "Something Went Worng",
      });
    }
  }

  const FeatchUser = async () => {
    try {
      const responce = await axios.get(
        `http://192.168.16.129:4445/user/all/name`
      );
      const result = responce.data.data;
      let users: any = [];
      result.forEach((el: any) => {
        users.push({ value: el.id, label: el.userName });
      });

      setUsers(users);
    } catch (err) {
      console.log(err);
    }
  };
  const FeatchProject = async () => {
    try {
      const responce = await axios.get(`http://192.168.16.129:4445/all`);
      const result = responce.data.data;
      const projectList: any = [];

      result.forEach((el: any) => {
        projectList.push({ value: el.id, label: el.title });
        setProjects(projectList);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const form = useForm({
    initialValues: {
      projectname: "",
      title: "",
      type: "",
      assigne: "",
      description: "",
      file: null,
    },
    validate: {
      projectname: (val) => (val === "" ? "Enter Valid Data" : null),
    },
  });

  useEffect(() => {
    FeatchUser();
    FeatchProject();
  }, [createrid]);
  return (
    <div>
      <Box>
        <form onSubmit={form.onSubmit(onSubmit)}>
          <Select
            clearable
            searchable
            label="Project Name"
            placeholder="SelectProject"
            data={projects}
            withAsterisk
            {...form.getInputProps("projectname")}
          ></Select>
          <TextInput
            {...form.getInputProps("title")}
            label="Title"
            placeholder="Title"
            withAsterisk
          ></TextInput>
          <Select
            {...form.getInputProps("type")}
            label="Type"
            placeholder="SelectProject"
            data={[
              {
                value: "1",
                label: "Task",
              },
              {
                value: "2",
                label: "Bug",
              },
            ]}
            withAsterisk
          ></Select>
          <Select
            {...form.getInputProps("assigne")}
            label="Assignee"
            searchable
            placeholder="SelectProject"
            data={users}
            withAsterisk
          ></Select>
          <Textarea
            label="Description"
            withAsterisk
            placeholder="Enter Description"
            {...form.getInputProps("description")}
          ></Textarea>
          <FileInput
            icon={<IconUpload size={14} />}
            accept="image/png,image/jpeg,image/jpg"
            multiple
            placeholder="Pick file"
            label="Screen short"
            value={value}
            onChange={setValue}
          />

          <div className="mt-2 flex justify-end items-center">
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Box>
    </div>
  );
};

export default CreateTask;
