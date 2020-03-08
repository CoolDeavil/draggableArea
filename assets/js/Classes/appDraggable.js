
export default class ADraggable {
    constructor(){
        this.domElement = null;
        this.boundary =  null;
        this.dragging =  null;
        this.position = null;
        this.startPosition = null;
        this.respectBoundaries = null;
        this.reset = null;

        this.options = {
            element: null,
            extraClass: null,
            reset: null,
            top: null,
            left: null,

        };
        let defaults = {
            element: null,
            extraClass: null,
            reset: false,
            top: null,
            left: null,
        };
        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = extendDefaults(defaults, arguments[0]);
        } else {
            this.options = extendDefaults(defaults, []);
        }
        function extendDefaults(source, properties) {
            let property;
            for (property in properties) {
                if (properties.hasOwnProperty(property)) {
                    source[property] = properties[property];
                }
            }
            return source;
        }
        console.log('ADraggable V1.0');
        this.bootstrap();
    }
    bootstrap(){
        this.domElement = this.options.element;
        this.boundary = {};
        this.domElement.className = 'appDraggable';
        if(this.options.extraClass){
            this.domElement.classList.add(this.options.extraClass);
        }
        this.dragging = false;
        this.position = {x: 0, y: 0};
        this.startPosition = {x: 0, y: 0};
        this.reset = this.options.reset;
        this.respectBoundaries = false;
        this.setHandlers();
    }
    setHandlers(){
        this.domElement.addEventListener('pointerdown',this.dragStart.bind(this),false);
        document.addEventListener('pointerup',this.dragEnd.bind(this),false);
        document.addEventListener('pointermove',this.drag.bind(this),false);
        document.addEventListener('mousedown',this.dragStart.bind(this),false);
        document.addEventListener('mouseup',this.dragEnd.bind(this),false);
        document.addEventListener('mousemove',this.drag.bind(this),false);
    }
    setContainBoundaries(){
        this.respectBoundaries = true;
    }
    setBoundary(boundary) {
        this.boundary  = boundary;
    }
    dragStart(evt){
        evt.stopPropagation();
        if(evt.target !== this.domElement ){
            return;
        }
        this.dragging = true;
        this.startPosition = {
            x: evt.clientX - this.position.x,
            y: evt.clientY - this.position.y
        };
    }
    drag(evt){
        if (!this.dragging) {
            return;
        }
        this.position.x = evt.clientX - this.startPosition.x;
        this.position.y = evt.clientY - this.startPosition.y;
        // console.log(`Dragging  x: ${evt.clientX} y: ${evt.clientY}`);
        this.domElement.classList.add('isDragging');
        this.domElement.position = this.position;
        if(this.respectBoundaries){
            this.maintainBoundaries();
        }
        this.setTranslate(this.domElement.position.x, this.domElement.position.y)
    }
    dragEnd(){
        if (!this.dragging) {
            return;
        }
        this.dragging = false;
        this.domElement.classList.remove('isDragging');
        if (this.reset) {
            this.position = {x: 0, y: 0};
            this.setTranslate(0, 0)
        }
    }
    maintainBoundaries() {
        this.domElement.position.x = Math.round(Math.max(this.boundary.minX, this.domElement.position.x));
        this.domElement.position.x = Math.round(Math.min(this.boundary.maxX, this.domElement.position.x));
        this.domElement.position.y = Math.round(Math.max(this.boundary.minY, this.domElement.position.y));
        this.domElement.position.y = Math.round(Math.min(this.boundary.maxY, this.domElement.position.y));
    }
    setTranslate(xPos, yPos) {
        this.domElement.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }
}
