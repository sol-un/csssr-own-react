import OwnReact from ".";

class List extends OwnReact.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { children } = this.props;
    return <div>{children}</div>;
  }
}

export default List;
