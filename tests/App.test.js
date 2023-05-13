import App, { letters } from "../samples/App";
import List from "../src/List";
import ListItem from "../src/ListItem";

test("jsx works", () => {
  expect(App).toEqual({
    type: List,
    props: {
      children: letters.map(letter => ({
        type: ListItem,
        props: { letter, children: [] }
      }))
    }
  });
});
