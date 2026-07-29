"use server";

import { signIn, signOut } from "@/auth";

export async function signInToMarketingPortal() {
  await signIn("google", { redirectTo: "/marketing" });
}

export async function signOutOfMarketingPortal() {
  await signOut({ redirectTo: "/marketing/login" });
}
