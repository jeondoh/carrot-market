import { FieldErrors, useForm } from "react-hook-form";

interface ILoginForm {
  username: string;
  password: string;
  email: string;
}

export default function Forms() {
  const { register, watch, handleSubmit } = useForm<ILoginForm>();
  const onValid = (data: ILoginForm) => {
    console.log("im valid bby");
  };
  const onInvalid = (errors: FieldErrors) => {
    console.log(errors);
  };

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <input
        {...register("username", {
          required: "username is required",
          minLength: {
            message: "The username should be longer than 5 chars",
            value: 5,
          },
        })}
        type="text"
        placeholder="Username"
      />
      <input
        {...register("email", { required: "email is required" })}
        type="email"
        placeholder="Email"
      />
      <input
        {...register("password", { required: "password is required" })}
        type="password"
        placeholder="Password"
      />
      <input type="submit" value="Create Account" />
    </form>
  );
}
