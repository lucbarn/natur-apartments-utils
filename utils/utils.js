function typewriter(s, el, cursorElement, timeStep, animationName, i=0) {
  if (i === 0 && cursorElement !== undefined) {
    cursorElement.style.opacity = '1';
    cursorElement.style.animationName = 'none';
  }
  el.innerHTML += s.charAt(i);
  if (i < s.length - 1) {
    window.setTimeout(function() {
        typewriter(s, el, cursorElement, timeStep, animationName, i+1);
      },
      timeStep
    );
  } else {
    el.innerHTML = s;
    if (cursorElement !== undefined) {
      cursorElement.style.opacity = '0';
      cursorElement.style.animationName = animationName;
    }
  }
}

function isVisible(element, percentage = 0, viewport = false) {
  if ((percentage < 0) || (percentage > 100)) {
    return false;
  }
  const top = element.getBoundingClientRect().top;
  const bottom = element.getBoundingClientRect().bottom;
  let p;
  if ((top > window.innerHeight) || (bottom < 0)) {
    p = 0;
  } else if (top > 0) {
    p = ((Math.min(bottom, window.innerHeight) - top) / element.clientHeight) * 100;
  } else {
    p = (Math.min(bottom, window.innerHeight) / element.clientHeight) * 100;
  }
  const viewportCovered = (p * element.clientHeight) / window.innerHeight;
  return (viewport ? viewportCovered : p) > percentage;
}
