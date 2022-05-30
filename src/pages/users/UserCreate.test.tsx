import { render, screen, waitFor } from "@testing-library/react";
import UserCreate from "./UserCreate";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { createMemoryHistory } from "history";
import { Router } from "react-router";

const server = setupServer(
  rest.get("/user", (req, res, ctx) => {
    console.log("queried");
    return res(ctx.json({ user: [] }));
    // return res(ctx.status(500));
  }),

  rest.get("/roles", (req, res, ctx) => {
    console.log("queried");
    return res(ctx.json([]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("redirects to login if error", async () => {
  server.use(
    rest.get("/user", (req, res, ctx) => {
      return res(ctx.status(500));
    })
  );

  const history = createMemoryHistory();

  expect(() => {
    render(
      <Router location={history.location} navigator={history}>
        <UserCreate />
      </Router>
    );
  }).toThrowError();

  // render(
  //   <Router location={history.location} navigator={history}>
  //     <UserCreate />
  //   </Router>
  // );

  await waitFor(() => expect(history.location.pathname).toBe("/login"));
});
