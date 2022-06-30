import "../styles/globals.css";
import superjson from "superjson";
import type { AppProps } from "next/app";
import { withTRPC } from "@trpc/next";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { AppRouter } from "../server/routes/app.router";
import { url } from "../constants";
import { trpc } from "../utils/trpc";
import { UserContextProvider } from "../context/user.context";

function MyApp({ Component, pageProps }: AppProps) {
  const { data, error, isLoading } = trpc.useQuery(["users.me"]);

  if (isLoading) {
    return <p>Loading user...</p>;
  }

  return (
    <UserContextProvider value={data}>
      <main>
        <Component {...pageProps} />
      </main>
    </UserContextProvider>
  );
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const links = [
      loggerLink(),
      httpBatchLink({
        maxBatchSize: 10,
        url,
      }),
    ];

    return {
      links,
      transformer: superjson,
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 60,
          },
        },
      },
      headers() {
        if (ctx?.req) {
          return { ...ctx.req.headers, "x-ssr": "1" };
        }

        return {};
      },
    };
  },
  ssr: false,
})(MyApp);
