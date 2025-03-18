import { SvelteKitAuth } from "@auth/sveltekit";
import { authConfig } from "./config";

const { handle, signIn, signOut } = SvelteKitAuth(authConfig)

export { handle as authHandle, signIn, signOut}