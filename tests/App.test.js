import App from "../samples/App";
import List from "../src/List";

test("jsx works", () => {
  expect(App).toEqual({
    type: List,
    props: {
      children: [
        {
          type: "div",
          props: {
            children: [
              { type: "TEXT ELEMENT", props: { nodeValue: "Hello World" } }
            ]
          }
        },
        {
          type: "div",
          props: {
            children: [
              { type: "TEXT ELEMENT", props: { nodeValue: "Hello React" } }
            ]
          }
        }
      ]
    }
  });
});
