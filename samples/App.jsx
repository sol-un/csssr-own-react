import OwnReact from "../src";
// eslint-disable-next-line import/extensions
import List from "../src/List.jsx";
import ListItem from "../src/ListItem";

export const letters = [
  "а",
  "б",
  "в",
  "г",
  "д",
  "е",
  "ё",
  "ж",
  "з",
  "и",
  "й",
  "к",
  "л",
  "м",
  "н",
  "о",
  "п",
  "р",
  "с",
  "т",
  "у",
  "ф",
  "х",
  "ц",
  "ч",
  "ш",
  "щ",
  "ъ",
  "ы",
  "ь",
  "э",
  "ю",
  "я"
];

const App = (
  <List>
    {letters.map(letter => (
      <ListItem letter={letter} />
    ))}
  </List>
);

export default App;
