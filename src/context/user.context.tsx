import { inferProcedureOutput } from "@trpc/server";
import React, { createContext, useContext } from "react";
import { AppRouter } from "../server/routes/app.router";

type TQuery = keyof AppRouter["_def"]["queries"];

type InferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<
  AppRouter["_def"]["queries"][TRouteKey]
>;

const UserContext = createContext<InferQueryOutput<"users.me">>(null);

export function UserContextProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: InferQueryOutput<"users.me"> | undefined;
}) {
  return (
    <UserContext.Provider value={value || null}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
