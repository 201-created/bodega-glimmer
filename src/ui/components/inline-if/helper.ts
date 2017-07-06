export default function inlineIf([conditional, truthyContent, falsyContent]) {
  return conditional ? truthyContent : falsyContent;
};
