/*
 * Copyright (C) 2025 [red.ornob](https://github.com/red-ornob) [<red.ornob.dev@gmail.com>](mailto:red.ornob.dev@gmail.com)
 * This program is subject to the AGPL-3.0-or-later licence.
 * Check NOTICE.md at the project root for the full notice.
 */

// async function not needed probably
// function typeset(code, isRendering) {
//   MathJax.startup.promise = MathJax.startup.promise
//     .then(() => MathJax.typesetPromise(code()))
//     .catch((err) => console.log('Typeset failed: ' + err.message));
//   return MathJax.startup.promise;
// }

document.addEventListener("DOMContentLoaded", function () {
  
  const editor = document.querySelector('#editor');
  const viewer = document.querySelector('#viewer');

  let toRender = false;
  // let isRendering = false;

  editor.addEventListener('input', function () {
    viewer.innerHTML = editor.value;
    toRender = true;
  });

  setInterval(function checkToRender() { // to limit the number of calls
    if (toRender) { // to only call when there is a change
      // not needed? does setInterval not call a running function?
      // isRendering = true;
      MathJax.typeset([viewer])
      // isRendering = false;
      toRender = false;
    }
  }, 1);
});
