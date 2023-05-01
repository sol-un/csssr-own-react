const isString = item => typeof item === "string";
const isListener = name => name.startsWith("on");
const isAttribute = name => !isListener(name) && name !== "children";
const isTextElement = element => element.type === "TEXT ELEMENT";

const convertStringToTextElement = element =>
  isString(element)
    ? {
        type: "TEXT ELEMENT",
        props: { nodeValue: element }
      }
    : element;

class OwnReact {
  static createElement(type, props, ...children) {
    const childElements = children.map(convertStringToTextElement);
    return { type, props, children: childElements };
  }

  static render(element, container) {
    const { type, props } = element;

    const parent = isTextElement(element)
      ? document.createTextNode("")
      : document.createElement(type);

    if (props) {
      Object.keys(props)
        .filter(isListener)
        .forEach(name => {
          const eventType = name.toLowerCase().substring(2);
          parent.addEventListener(eventType, props[name]);
        });

      Object.keys(props)
        .filter(isAttribute)
        .forEach(name => {
          parent[name] = props[name];
        });
    }

    const childElements = element.children || [];
    childElements.forEach(childElement => this.render(childElement, parent));
    container.appendChild(parent);
  }
}

export default OwnReact;
