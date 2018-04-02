# natur-apartments-utils

`utils.js` contains some utility functions that I wrote for www.natur.apartments

<strong>typewriter()</strong> is a function that writes a string (s) inside a target element (el). The timeStep
parameter specifies the frequency with which letters are added.
The function has to be used in conjunction with a css animation. In case of natur apartments it is:

@keyframes blink {  
&nbsp;&nbsp;0% {  
&nbsp;&nbsp;&nbsp;&nbsp;opacity: 0;  
&nbsp;&nbsp;}  
&nbsp;&nbsp;50% {  
&nbsp;&nbsp;&nbsp;&nbsp;opacity: 1;  
&nbsp;&nbsp;}  
&nbsp;&nbsp;100% {  
&nbsp;&nbsp;&nbsp;&nbsp;opacity: 0;  
&nbsp;&nbsp;}  
}

<strong>isVisible()</strong> is a function that returns the percentage of the input element that is visible in the viewport. If the argument viewport is set to true, the function returns the percentage of the viewport that is covered by the input element.
