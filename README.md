# Scroll Application

### What it does
Adds smooth movement to scrollbar when you click into an anchor

### How it works
First you need to create link tags with ```href as a target``` and ```class '.anchor'```, so the app will know where are your anchors and where to point it:
```html
<a href="#first" class="anchor" title="">First</a>
```
After doing these, you need to start the app sending the container of your anchors and speed.

**Obs.:** if you do not send a speed, default will be 10(ms).


### Calling the app
```javascript
var sc = new Scroll();
sc.init({
    target: document.querySelector('body'),
    speed: 20
});
```
