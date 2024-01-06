"use server";
import { signIn } from "@/auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", {
      username,
      password,
      redirect: false,
      callbackUrl: "/dashboard",
    });
    return "success"
  } catch (err) {
    return "Wrong Credentials!" + err + " " + username + " " + password;
  }
}
