"use server";

import { signIn } from "@/auth";

export async function signInWithApp(provider: string) {
  await signIn(provider);
}
