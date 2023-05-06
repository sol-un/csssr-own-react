import App from "../samples/App";
import List from "../src/List";

test("jsx works", () => {
  expect(App).toEqual({
    type: List,
    props: {
      children: []
    }
  });
});
