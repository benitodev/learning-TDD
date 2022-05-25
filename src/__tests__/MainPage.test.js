import React from "react";
import { render, screen } from "@testing-library/react";
import MainPage from "../components/MainPage";

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
});
