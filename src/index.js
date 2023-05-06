/* eslint-disable max-classes-per-file */
/* eslint-disable no-param-reassign */

const isString = item => typeof item === "string";
const isListener = name => name.startsWith("on");
const isAttribute = name => !isListener(name) && name !== "children";
const isTextElement = element => element.type === "TEXT ELEMENT";
const isDomElement = element => typeof element.type === "string";

const convertStringToTextElement = element =>
  isString(element)
    ? {
        type: "TEXT ELEMENT",
        props: { nodeValue: element }
      }
    : element;

const updateDomProperties = (dom, prevProps, nextProps) => {
  if (prevProps.length) {
    Object.keys(prevProps)
      .filter(isAttribute)
      .forEach(name => {
        dom[name] = null;
      });

    Object.keys(prevProps)
      .filter(isListener)
      .forEach(name => {
        const eventType = name.toLowerCase().substring(2);
        dom.removeEventListener(eventType, prevProps[name]);
      });
  }

  Object.keys(nextProps)
    .filter(isAttribute)
    .forEach(name => {
      dom[name] = nextProps[name];
    });

  Object.keys(nextProps)
    .filter(isListener)
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
};

const createPublicInstance = (element, internalInstance) => {
  const { type, props } = element;
  // eslint-disable-next-line new-cap
  const publicInstance = new type(props);
  // eslint-disable-next-line no-underscore-dangle
  publicInstance.__internalInstance = internalInstance;
  return publicInstance;
};

const instantiate = element => {
  const { type, props } = element;
  const isDom = isDomElement(element);

  if (isDom) {
    const dom = isTextElement(element)
      ? document.createTextNode("")
      : document.createElement(type);

    if (props) {
      updateDomProperties(dom, [], props);
    }

    const childElements = props.children || [];

    const childInstances = childElements.map(instantiate);
    const childDoms = childInstances.map(childInstance => childInstance.dom);
    childDoms.forEach(childDom => {
      return dom.appendChild(childDom);
    });
    const instance = { dom, element, childInstances };
    return instance;
  }

  const instance = {};
  const publicInstance = createPublicInstance(element, instance);
  const childElement = publicInstance.render();
  const childInstance = instantiate(childElement);
  const { dom } = childInstance;
  Object.assign(instance, { dom, element, childInstance, publicInstance });
  return instance;
};

class OwnReact {
  constructor() {
    this.rootInstance = null;
  }

  static createElement(type, props, ...children) {
    const childElements = children.map(convertStringToTextElement);
    return { type, props: { ...props, children: childElements } };
  }

  static render(element, container) {
    const prevInstance = this.rootInstance;
    const nextInstance = this.reconcile(container, prevInstance, element);
    this.rootInstance = nextInstance;
  }

  static reconcile(parentDom, instance, element) {
    if (instance == null) {
      const newInstance = instantiate(element);
      parentDom.appendChild(newInstance.dom);
      return newInstance;
    }
    if (element === null) {
      parentDom.removeChild(instance.dom);
      return null;
    }
    if (instance.element.type === element.type) {
      updateDomProperties(instance.dom, instance.element.props, element.props);
      instance.childInstances = this.reconcileChildren(instance, element);
      instance.element = element;
      return instance;
    }
    if (typeof element.type === "string") {
      updateDomProperties(instance.dom, instance.element.props, element.props);
      instance.childInstances = this.reconcileChildren(instance, element);
      instance.element = element;
      return instance;
    }
    instance.publicInstance.props = element.props;
    const childElement = instance.publicInstance.render();
    const oldChildInstance = instance.childInstance;
    const childInstance = this.reconcile(
      parentDom,
      oldChildInstance,
      childElement
    );
    instance.dom = childInstance.dom;
    instance.childInstance = childInstance;
    instance.element = element;
    return instance;
  }

  static reconcileChildren(instance, element) {
    const { dom } = instance;
    const { childInstances } = instance;
    const nextChildElements = element.props.children || [];
    const newChildInstances = [];
    const count = Math.max(childInstances.length, nextChildElements.length);
    for (let i = 0; i < count; i += 1) {
      const childInstance = childInstances[i];
      const childElement = nextChildElements[i];
      const newChildInstance = this.reconcile(dom, childInstance, childElement);
      newChildInstances.push(newChildInstance);
    }
    return newChildInstances.filter(newInstance => newInstance != null);
  }

  static updateInstance(internalInstance) {
    const parentDom = internalInstance.dom.parentNode;
    const { element } = internalInstance;
    this.reconcile(parentDom, internalInstance, element);
  }
}

class Component {
  constructor(props) {
    this.props = props;
    this.state = this.state || {};
  }

  setState(partialState) {
    this.state = { ...this.state, ...partialState };
    // eslint-disable-next-line no-underscore-dangle
    OwnReact.updateInstance(this.__internalInstance);
  }
}

OwnReact.Component = Component;
export default OwnReact;
