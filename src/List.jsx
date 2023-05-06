import OwnReact from ".";

class List extends OwnReact.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return <div>Hello, React</div>;
  }
}

export default List;
