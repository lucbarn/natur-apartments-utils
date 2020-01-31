# video-map-tracking
The aim of `video-map.html` is to show on a map the position in a video, such as the position of a mountain bike rider who is recording the video, or simply someone who is walking on the street.

# Usage
First of all complete the src attribute of the video element (line 21 in video-map.html) and assign a value to the three variables latitude, longitude and zoom (lines 2-4 in script.js).
The values of latitude and longitude indicate the initial position.
Click on the REC button and then on the orange point at the center of the map (the initial position).
The video will start playing. Every 100ms (or any other value you choose) the position of the cursor will be saved in the timePosition variable, so move the cursor to keep track of the position in the video until it ends.
At this point click on the REC button again and then on the purple toggle switch below. Now you can play the video and on the map the position will be showed.
