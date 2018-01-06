function typewriter(s, el, cursor=undefined, i=0) {
  if (i === 0 && cursor !== undefined) {
    cursor.style.opacity = '1';
    cursor.style.animationName = 'none';
  }
  el.innerHTML += s.charAt(i);
  if (i < s.length - 1) {
    window.setTimeout(function() {
        typewriter(s, el, cursor=cursor, i=i+1);
      },
      75
    );
  } else {
    el.innerHTML = s;
    if (cursor !== undefined) {
      cursor.style.opacity = '0';
      cursor.style.animationName = 'blink';
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
