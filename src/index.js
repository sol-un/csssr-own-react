class OwnReact {
  static createElement(...args) {
    const [type, props, children] = args;
    return { type, props, children };
  }

  static render(element, container) {
    console.log(element, container);
  }
}

export default OwnReact;
