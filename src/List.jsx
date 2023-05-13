import OwnReact from ".";

const getRandomNumber = max => Math.floor(Math.random() * max);

const shuffleElements = (arr, randomizer = getRandomNumber) => {
  const shufflesAmount = getRandomNumber(10);
  const copy = [...arr];

  for (let i = 0; i < shufflesAmount - 1; i += 1) {
    const first = randomizer(copy.length);
    const second = randomizer(copy.length);
    [copy[first], copy[second]] = [copy[second], copy[first]];
  }
  return copy;
};

class Alphabet extends OwnReact.Component {
  constructor(props) {
    super(props);
    this.props = props;
    const { letters } = this.props;
    this.state = { letters };
  }

  updateLetters() {
    const { letters } = this.state;
    const newState = shuffleElements(letters);
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
