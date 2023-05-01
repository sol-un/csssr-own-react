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

const instantiate = element => {
  const { type, props } = element;

  const dom = isTextElement(element)
    ? document.createTextNode("")
    : document.createElement(type);

  if (props) {
    Object.keys(props)
      .filter(isListener)
      .forEach(name => {
        const eventType = name.toLowerCase().substring(2);
        dom.addEventListener(eventType, props[name]);
      });

    Object.keys(props)
      .filter(isAttribute)
      .forEach(name => {
        dom[name] = props[name];
      });
  }

  const childElements = element.children || [];

  const childInstances = childElements.map(instantiate);
  const childDoms = childInstances.map(childInstance => childInstance.dom);
  childDoms.forEach(childDom => {
    return dom.appendChild(childDom);
  });
  const instance = { dom, element, childInstances };
  return instance;
};

const reconcile = (parentDom, instance, element) => {
  if (instance == null) {
    const newInstance = instantiate(element);
    parentDom.appendChild(newInstance.dom);
    return newInstance;
  }

  const newInstance = instantiate(element);
  parentDom.replaceChild(newInstance.parent, instance.dom);
  return newInstance;
};

class OwnReact {
  constructor() {
    this.rootInstance = null;
  }

  static createElement(type, props, ...children) {
    const childElements = children.map(convertStringToTextElement);
    return { type, props, children: childElements };
  }

  static render(element, container) {
    const prevInstance = this.rootInstance;
    const nextInstance = reconcile(container, prevInstance, element);
    this.rootInstance = nextInstance;
  }
}

export default OwnReact;
