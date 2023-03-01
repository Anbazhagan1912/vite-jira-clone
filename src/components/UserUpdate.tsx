import { NumberInput, TextInput } from "@mantine/core";
import { Select } from "@mantine/core";
import { Modal } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useState } from "react";
import { Button } from "@mantine/core";
import axios from "axios";
const UserUpdate = ({ id }: any) => {
  const [Alert, SetAlert] = useState<number>(0);
  const UpdateUser = async (values: typeof form.values) => {
    const data = {
      firstName: values.firstName,
      lastName: values.lastName,
      userName: values.userName,
      email: values.email,
      role: values.role === "1" ? "Admin" : "User",
      password: values.password,
    };

    try {
      const responce = await axios.patch(
        `http://192.168.16.129:4445/user/${id}`,
        data
      );
      responce.status === 200 || responce.status === 201
        ? showNotification({
            title: "Success",
            message: `User Updated`,
            color: "green",
          })
        : null;
    } catch (err) {
      console.log(err);
    }
  };
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      phoneNumber: "",
      email: "",
      role: "",
      password: "",
    },
    validate: {
      firstName: (val) => (val.length > 2 ? null : "Enter Valid FirstName"),
      lastName: (val) => (val.length > 0 ? null : "Enter Valid LastName"),

      userName: (val) => (val.length > 2 ? null : "Enter Valid UserName"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (val) => (val.length > 5 ? null : "Enter Valid Password "),
    },
  });
  console.log(form);

  return (
    <div>
      <form onSubmit={form.onSubmit(UpdateUser)}>
        <TextInput
          {...form.getInputProps("firstName")}
          label={"Firstname"}
          placeholder="Enter FirstName"
        ></TextInput>
        <TextInput
          {...form.getInputProps("lastName")}
          label={"Lastname"}
          placeholder="Enter LastName"
        ></TextInput>
        <TextInput
          {...form.getInputProps("userName")}
          label={"UserName"}
          placeholder="Enter User Name"
        ></TextInput>

        <NumberInput
          label={"Phone Number"}
          placeholder="Phone Number"
          {...form.getInputProps("phoneNumber")}
        ></NumberInput>
        <TextInput
          {...form.getInputProps("email")}
          label="Email"
          placeholder="Email"
        ></TextInput>
        <TextInput
          {...form.getInputProps("password")}
          label="Password"
          placeholder="Password"
        ></TextInput>
        <Select
          label="Role"
          {...form.getInputProps("role")}
          placeholder="Role"
          data={[
            { value: "1", label: "Admin" },
            { value: "2", label: "User" },
          ]}
        ></Select>

        <Button className="mt-2 bg-bluebg" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default UserUpdate;
