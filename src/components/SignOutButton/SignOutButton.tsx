import { LogOut } from "lucide-react";
import { signOutAction } from "./actions";

export function SignOutButton() {
  return (
    <form action={signOutAction}>
      <button type="submit">
        <LogOut />
      </button>
    </form>
  );
}
