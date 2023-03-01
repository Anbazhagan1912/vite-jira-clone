import { Button, TextInput } from "@mantine/core";
import { PasswordInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { State } from "./atom";
import { useRecoilState } from "recoil";
import { IconUser } from "@tabler/icons";
import { showNotification } from "@mantine/notifications";

const Login = () => {
  const [isLogin, setIsLogin] = useRecoilState(State);
  const navigate = useNavigate();
  const onSubmit = async (values: typeof form.values) => {
    try {
      const responce = await axios.post(
        `http://192.168.16.129:4445/auth/signin`,
        {
          email: values.email,
          password: values.password,
        }
      );
      console.log(responce);
      if (responce.status === 200 || responce.status === 201) {
        setIsLogin(true);
        showNotification({
          title: "Success",
          message: `Wellcome ${responce.data.data.userName}`,
        });
        localStorage.setItem("token", responce.data.data.token);
        localStorage.setItem("username", responce.data.data.userName);
        localStorage.setItem("id", responce.data.data.id);
        localStorage.setItem("role", responce.data.data.role);
        navigate("/Main");
      }
    } catch (err: any) {
      showNotification({
        title: err.response.data.message,
        message: "Error",
        color: "red",
      });
    }
  };
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (val) => (val.length > 0 ? null : "Invalid Password"),
    },
  });
  return (
    <div>
      <div className="w-[350px] p-[10px]">
        <form onSubmit={form.onSubmit(onSubmit)}>
          <div className="text-center  ">
            <IconUser
              color="#fff"
              className="text-center"
              size={"70"}
            ></IconUser>
          </div>
          <TextInput
            className="mb-2 text-2xl"
            label="Email"
            placeholder="@gmail.com"
            {...form.getInputProps("email")}
          ></TextInput>
          <PasswordInput
            className="mt-2"
            label="Password"
            placeholder="Password"
            {...form.getInputProps("password")}
          ></PasswordInput>
          <Button
            className="text-center mt-[20px] p-3 h-[40px] w-[350px] bg-bluebg"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
