import ADraggable from "./appDraggable";

export default class DraggableArea {

    constructor() {
        this.viewRect = null;
        this.boundaries = [];
        this.dragCounter = 0;
        this.draggables = [];

        this.options = {
            canvas: null,
            contain: null,
        };
        let defaults = {
            canvas: null,
            contain: false,
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
        this.bootstrap();
    }
    bootstrap(){
        if(this.options.canvas === null ){
            throw ('No Base Element defined....')
        }
        this.canvas = document.querySelector(`.${this.options.canvas}`);
        this.viewRect = this.canvas.getBoundingClientRect();
    }
    addDraggable(){
        let div = document.createElement('DIV');
        div.position = {
            x:0,
            y:0
        };
        this.canvas.appendChild( div );
        this.draggables.push(new ADraggable({
            element: div
        }));
        if(this.options.contain) {
            this.draggables[this.dragCounter].setContainBoundaries(true);
            this.draggables[this.dragCounter].setBoundary(this.measureBoundaries(div));
        }
        this.draggables[this.dragCounter].setBoundary(this.measureBoundaries(div));
        this.boundaries.push(this.measureBoundaries(div));
        div.innerHTML = 'Contained ' + Math.round( this.dragCounter+1);
        this.dragCounter++;
    }

    measureBoundaries(draggable){
        const draggableViewRect= draggable.getBoundingClientRect();
        let boundary = {
            minX: Math.round(this.viewRect.left - draggableViewRect.left + draggable.position.x),
            maxX: Math.round(this.viewRect.right - draggableViewRect.right + draggable.position.x),
            minY: Math.round(this.viewRect.top - draggableViewRect.top + draggable.position.y),
            maxY: Math.round(this.viewRect.bottom - draggableViewRect.bottom + draggable.position.y)
        };
        return(boundary)
    }

}
