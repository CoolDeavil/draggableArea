

String.prototype.replaceAll = function(search, replacement) {
    let target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

/* Js Array Unique Prototype */
Array.prototype.unique = function() {
    return this.filter(function (value, index, self) {
        return self.indexOf(value) === index;
    });
};

/* Js Document Ready Prototype */
(function(){
    Document.prototype.ready = function(callback) {
        if(callback && typeof callback === 'function') {
            document.addEventListener("DOMContentLoaded", function() {
                if(document.readyState === "interactive" || document.readyState === "complete") {
                    return callback();
                }
            });
        }
    };
})();



