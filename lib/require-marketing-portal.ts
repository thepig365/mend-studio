import { redirect } from "next/navigation";
import { auth, isMarketingAuthConfigured, marketingPortalEmail } from "@/auth";

export async function requireMarketingPortal() {
  if (!isMarketingAuthConfigured()) {
    redirect("/marketing/login");
  }

  const session = await auth();
  const email = session?.user?.email?.trim().toLowerCase();
  if (email !== marketingPortalEmail) {
    redirect("/marketing/login");
  }
}
