/*
 * loadScript will load a JavaScript asset. Subsequent load
 * calls with a already requested URL will just chain off the
 * already existing promise.
 */

let loadedScripts = {};

export default function loadScript(url) {
  let promise = loadedScripts[url];
  if (!promise) {
    promise = new Promise((resolve, reject) => {
      let element = document.createElement('script');
      element.type = 'text/javascript';
      element.async = false;
      element.addEventListener('load', resolve, false);
      element.addEventListener('error', event => {
        let error = new Error(`Could not load script ${url}`);
        reject(error);
      }, false);

      element.src = url;

      let firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode.insertBefore(element, firstScript);
    });

    loadedScripts[url] = promise;
  }

  return promise;
}
