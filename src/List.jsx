import OwnReact from ".";

class List extends OwnReact.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { children } = this.props;
    return (
      // eslint-disable-next-line react/style-prop-object
      <div style="display:flex;justify-content:space-around;">{children}</div>
    );
  }
}

export default List;
