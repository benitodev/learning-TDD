import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import MainPage from "../components/MainPage";

const fakeQuotes = [
  { quote: "Gah, stupid sexy Flanders!" },
  { quote: "Eat my shorts" },
  { quote: "Shut up, brain. I got friends now. I don't need you anymore" },
];

const server = setupServer(
  rest.get("/quotes", (req, res, ctx) => {
    return res(ctx.json(fakeQuotes));
  })
);
beforeAll(() => server.listen());
// eslint-disable-next-line testing-library/no-render-in-setup
beforeEach(() => render(<MainPage />));
describe("Main page mount", () => {
  it("must display the main page title", async () => {
    expect(
      screen.getByRole("heading", { name: /simpson quotes/i })
    ).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
  });
});

describe("Quotes List", () => {
  it("must dispaly 3 quotes", async () => {
    expect(await screen.findAllByRole("listitem")).toHaveLength(3);
  });
  it("must contain quote value", async () => {
    const [firstQuote, secondQuote, thirdQuote] = await screen.findAllByRole(
      "listitem"
    );
    const [fakeOne, fakeTwo, fakeThird] = fakeQuotes;
    expect(firstQuote.textContent).toBe(fakeOne.quote);
    expect(secondQuote.textContent).toBe(fakeTwo.quote);
    expect(thirdQuote.textContent).toBe(fakeThird.quote);
  });
});
afterAll(() => server.close());
