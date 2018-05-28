# natur-apartments-utils

`utils.js` contains some utility functions that I wrote for www.natur.apartments

<strong>typewriter()</strong> is a function that writes a string (s) inside a target element (el). The timeStep
parameter specifies the frequency with which letters are added.
The function has to be used in conjunction with a css animation. The one used in www.natur.apartments is:

```css
@keyframes blink {
 0% {  
  opacity: 0;  
 }  
 50% {  
  opacity: 1;  
 }  
 100% {  
  opacity: 0;  
 }  
}
```

<strong>isVisible()</strong> is a function that returns the percentage of the input element that is visible in the viewport. If the argument viewport is set to true, the function returns the percentage of the viewport that is covered by the input element.

In the following example, the video plays only if
at least 40% of its area is visible:

```html
<video id="video1" src="video-source"></video>

<script>

  const v = document.getElementById('video1');

  window.onscroll = function() {
    if (isVisible(v, 40) && v.paused) {
      v.play();
    } else if (!isVisible(v, 40) && !v.paused) {
      v.pause();
    }
  };

</script>
```
