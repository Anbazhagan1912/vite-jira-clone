// task/update
import { useForm } from "@mantine/form";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import { FileInput } from "@mantine/core";
import { Button } from "@mantine/core";
import axios from "axios";
import { IconUpload } from "@tabler/icons";
import { useEffect } from "react";
import { Select, TextInput } from "@mantine/core";
type data = {
  status: any;
  description: string;
  projectId: number;
  title: string;
  id: number;
};
const UpdateTask = ({ status, description, projectId, title, id }: data) => {
  const [value, setValue] = useState<File[] | any>([]);
  const createrid: any = localStorage.getItem("id");
  const [user, SetUsers] = useState<string[]>([]);
  const onSubmit = async (values: typeof form.values) => {
    const formData = new FormData();
    value.forEach((file: File) => {
      formData.append("files", file);
    });
    formData.append("title", title);
    formData.append("creatoId", createrid);
    formData.append("projectId", String(projectId));
    formData.append("type", values.type);
    formData.append("assigneeId", values.assignee);
    formData.append("statusId", values.ststus);
    formData.append("taskId", String(id));

    try {
      const responce = await axios.patch(
        `http://192.168.16.129:4445/task/update`,
        formData
      );

      if (responce.status === 200 || responce.status === 201) {
        showNotification({
          title: "Success",
          message: "Task Updated",
          color: "green",
        });
      }
    } catch (err) {
      console.log(err);
      showNotification({
        title: "Error",
        message: "Something went worng",
        color: "red",
      });
    }
  };

  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      type: "0",
      ststus: "0",
      assignee: "0",
    },
  });

  const FetchUser = async () => {
    try {
      const responce = await axios.get(
        `http://192.168.16.129:4445/user/all/name`
      );
      const result = responce.data.data;

      let users: any = [];
      result.forEach((el: any) => {
        users.push({ value: el.id, label: el.userName });
        SetUsers(users);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    FetchUser();
  }, [createrid, id]);

  return (
    <div>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <TextInput
          readOnly
          {...form.getInputProps("title")}
          value={title}
          label={"Title"}
          withAsterisk
          placeholder={"Title"}
        ></TextInput>
        <TextInput
          readOnly
          withAsterisk
          {...form.getInputProps("description")}
          value={description}
          label={"Description"}
          placeholder="Description"
        ></TextInput>
        <Select
          withAsterisk
          defaultValue={status.type}
          {...form.getInputProps("ststus")}
          data={[
            { value: "1", label: "To do" },
            { value: "2", label: "inProgress" },
            { value: "3", label: "Reopen" },
            { value: "4", label: "Done" },
          ]}
          label="status"
          placeholder="status"
        ></Select>
        <Select
          withAsterisk
          {...form.getInputProps("assignee")}
          data={user}
          label={"Users"}
          placeholder="User Name"
        ></Select>

        <FileInput
          value={value}
          onChange={setValue}
          icon={<IconUpload size={14} />}
          label="Upload files"
          placeholder="Upload files"
          multiple
        />

        <Button type="submit" className="float-right mt-2">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default UpdateTask;
