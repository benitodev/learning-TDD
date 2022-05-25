const baseUrl =
  process.env.NODE_ENV !== "test"
    ? "https://thesimpsonsquoteapi.glitch.me/"
    : "";
export const getQuotes = () => fetch(`${baseUrl}quotes`);
