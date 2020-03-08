require('./bootstrap');

import ADraggable from "./Classes/appDraggable";
import DraggableArea from "./Classes/draggableArea";

window.onload = ()=>{

  let canvas = new DraggableArea({
    canvas: 'draggableArea',
    contain: true,
  });
  canvas.addDraggable();
  canvas.addDraggable();
  canvas.addDraggable();
  canvas.addDraggable();
  canvas.addDraggable();
  canvas.addDraggable();
  canvas.addDraggable();
  canvas.addDraggable();

  // eslint-disable-next-line no-unused-vars
  let drag1 = new ADraggable({
    element: document.querySelector('#box1'),
    reset: true,
    extraClass: 'lonely'
  });
};
