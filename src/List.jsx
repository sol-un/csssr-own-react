import OwnReact from ".";
import { shuffleArray } from "./utils";

class Alphabet extends OwnReact.Component {
  constructor(props) {
    super(props);
    this.props = props;
    const { letters } = this.props;
    this.state = { letters };
  }

  updateLetters() {
    const { letters } = this.state;
    const newState = shuffleArray(letters);
    this.setState({ letters: newState });
  }

  render() {
    const { letters } = this.state;
    return (
      // eslint-disable-next-line react/style-prop-object
      <div style="display:flex;justify-content:space-around;">
        {letters.map(letter => (
          <div>{letter}</div>
        ))}
      </div>
    );
  }
}

export default Alphabet;
