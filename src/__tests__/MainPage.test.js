import React from "react";
import { render, screen } from "@testing-library/react";
import MainPage from "../components/MainPage";

// eslint-disable-next-line testing-library/no-render-in-setup
beforeEach(() => render(<MainPage />));
describe("Main page mount", () => {
  it("must display the main page title", () => {
    expect(
      screen.getByRole("heading", { name: /simpson quotes/i })
    ).toBeInTheDocument();
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
    expect(firstQuote.textContent).toBe("Gah, stupid sexy Flanders!");
    expect(secondQuote.textContent).toBe("Eat my shorts");
    expect(thirdQuote.textContent).toBe(
      "Shut up, brain. I got friends now. I don't need you anymore"
    );
  });
});
