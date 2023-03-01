import { useState } from "react";
import { Button } from "@mantine/core";
import { Textarea } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
// http://192.168.16.129:4444/
function CreateProject({ HandelCancel }: any) {
  const createid: any = localStorage.getItem("id");
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
    },
    validate: {
      title: (val) => (val.length > 2 ? null : "Enter Valid Title"),
      description: (val) =>
        val.length > 2 ? null : " Enter Valid Description",
    },
  });
  const Create = async (values: typeof form.values) => {
    try {
      const responce = await axios.post(
        "http://192.168.16.129:4445/project/new",
        {
          title: values.title,
          description: values.description,
          creatorId: parseInt(createid),
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (responce.status === 201 || 200) {
        showNotification({
          title: "Success",
          message: `Projected Created`,
          color: "green",
        });
      }
    } catch (err) {
      console.log(err);
      showNotification({
        title: "Error",
        message: `Projected Created`,
        color: "red",
      });
    }
  };
  return (
    <div>
      <form onSubmit={form.onSubmit(Create)}>
        <TextInput
          label="Project Name"
          placeholder="Enter Project Name"
          withAsterisk
          {...form.getInputProps("title")}
        ></TextInput>

        <Textarea
          label="Description"
          placeholder="Enter Description"
          withAsterisk
          className="border-none"
          {...form.getInputProps("description")}
        ></Textarea>

        <div className="mt-8 float-right">
          <Button type="submit">Create</Button>
        </div>
      </form>
    </div>
  );
}

export default CreateProject;
