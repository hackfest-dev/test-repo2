import { db } from "$lib/db";
import { env } from "$src/env";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { DefaultSession, SvelteKitAuthConfig } from "@auth/sveltekit";

import Google from '@auth/sveltekit/providers/google';

/**
 * Module augmentation for `@auth/sveltekit` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://authjs.dev/getting-started/typescript#module-augmentation
 */
declare module '@auth/sveltekit' {
	interface Session extends DefaultSession {
		user: {
			id: string;
			// ...other properties
			// role: UserRole;
		} & DefaultSession['user'];
	}
}

/**
 * Options for Auth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://authjs.dev/guides/
 */
export const authConfig = {
	providers: [
        Google({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET
        })
		/**
		 * ...add more providers here.
		 *
		 * @see https://authjs.dev/getting-started/authentication/oauth
		 */
	],
	adapter: PrismaAdapter(db),
	callbacks: {
		session: ({ session, user }) => ({
			...session,
			user: {
				...session.user,
				id: user.id
			}
		})
	}
} satisfies SvelteKitAuthConfig;