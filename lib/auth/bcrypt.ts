import { hash } from "bcryptjs";

export async function hashPassword(password: string) {
  const hashedPassword = await hash(password, 6);
  return hashedPassword;
}
