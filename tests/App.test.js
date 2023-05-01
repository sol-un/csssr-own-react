import App from "../samples/App";

test("jsx works", () => {
  expect(App).toEqual({
    children: [
      {
        children: [
          { props: { nodeValue: "Hello, World!" }, type: "TEXT ELEMENT" }
        ],
        props: null,
        type: "div"
      },
      {
        children: [
          { props: { nodeValue: "Hello, React!" }, type: "TEXT ELEMENT" }
        ],
        props: null,
        type: "span"
      }
    ],
    props: { prop1: "prop value" },
    type: "h1"
  });
});
