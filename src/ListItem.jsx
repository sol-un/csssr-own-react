import OwnReact from ".";

class ListItem extends OwnReact.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { letter } = this.props;
    return <div>{letter}</div>;
  }
}

export default ListItem;
