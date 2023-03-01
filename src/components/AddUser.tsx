import { useForm } from "@mantine/form";
import { Group, TextInput } from "@mantine/core";
import { Button } from "@mantine/core";
import { Box } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { PasswordInput } from "@mantine/core";
import { Select } from "@mantine/core";
import axios from "axios";
const AddUser = () => {
  const SingupHandeler = async (values: typeof form.values) => {
    try {
      const data = {
        firstName: values.firstName,
        lastName: values.lastName,
        userName: values.userName,
        email: values.email,
        password: values.password,
        role: values.role,
        phoneNumber: values.phoneNumber,
      };
      const responce = await axios.post(
        "http://192.168.16.129:4445/auth/signup",
        data
      );
      console.log(responce);
      if (responce.status === 200 || responce.status === 201) {
        showNotification({
          title: "User Added",
          message: `${responce.data.userName} created`,
          color: "green",
        });
      }
    } catch (error: any) {
      console.log(error);
      showNotification({
        title: "Error",
        message: error.message,
        color: "red",
      });
    }
  };

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      role: "",
      phoneNumber: "",
    },
    validate: {
      firstName: (val) => (val.length > 0 ? null : "Enter Valid Name"),
      userName: (val) => (/[a-zA-z\-]+$/.test(val) ? null : "Invalid username"),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      // phoneNumber:(val)=>(/^(\+\d{1,3}[- ]?)?\d{10}$/.test(val) ? null :"Invalid Number")
    },
  });
  return (
    <div>
      <Box>
        <form onSubmit={form.onSubmit(SingupHandeler)}>
          <h1 className="mb-8 text-[20px]   ">Add user </h1>
          <div className="flex">
            <TextInput
              label="Firstname"
              placeholder="Firstname"
              {...form.getInputProps("firstName")}
            ></TextInput>
            <TextInput
              className="ml-2 "
              label="Lastname"
              placeholder="Lastname"
              {...form.getInputProps("lastName")}
            ></TextInput>
          </div>

          <TextInput
            label="UserName"
            placeholder="Username"
            {...form.getInputProps("userName")}
          ></TextInput>
          <TextInput
            label="Email"
            placeholder="@gmail.com"
            {...form.getInputProps("email")}
          ></TextInput>
          <PasswordInput
            label="Password"
            placeholder="********"
            {...form.getInputProps("password")}
          ></PasswordInput>
          <Select
            label="Your Role"
            placeholder="Role"
            searchable
            {...form.getInputProps("role")}
            nothingFound="No option"
            data={["User", "Admin"]}
          ></Select>
          <TextInput
            placeholder="Phone Number"
            label="Phone Number"
            {...form.getInputProps("phoneNumber")}
          ></TextInput>

          <Group position="center" mt="md">
            <Button className="mt-3" type="submit">
              Add User
            </Button>
          </Group>
        </form>
      </Box>
    </div>
  );
};

export default AddUser;
