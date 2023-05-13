export const isString = item => typeof item === "string";

export const isListener = name => name.startsWith("on");

export const isAttribute = name => !isListener(name) && name !== "children";

export const isTextElement = element => element.type === "TEXT ELEMENT";

export const isDomElement = element => typeof element.type === "string";

export const getRandomNumber = (max = 10) => Math.floor(Math.random() * max);

export const shuffleArray = (arr, random = getRandomNumber) => {
  const shufflesAmount = random();
  const copy = [...arr];

  for (let i = 0; i < shufflesAmount - 1; i += 1) {
    const first = random(copy.length);
    const second = random(copy.length);
    [copy[first], copy[second]] = [copy[second], copy[first]];
  }

  return copy;
};
