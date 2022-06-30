import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { CreateUserImput } from "../schema/user.schema";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";

function RegisterPage() {
  const router = useRouter();
  const { handleSubmit, register } = useForm<CreateUserImput>();
  const { mutate, error } = trpc.useMutation(["users.register-user"], {
    onSuccess: () => {
      router.push("/login");
    },
  });

  const onSubmit = (values: CreateUserImput) => {
    mutate(values);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}
        <h1>Register</h1>
        <input
          type="email"
          placeholder="jane.doe@example.com"
          {...register("email")}
        />
        <br />
        <input type="text" placeholder="Doe" {...register("name")} />
        <br />
        <button type="submit">Register</button>
      </form>
      <Link href="/login">Login</Link>
    </>
  );
}

export default RegisterPage;
