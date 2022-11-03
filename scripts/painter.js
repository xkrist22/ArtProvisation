/**
 * @file painter.js
 * @author Jiri Kristof <xkrist22@stud.fit.vutbr.cz>
 * @date October 2022
 * @brief File contains class implementing painting tools
 */

const TOOLBAR_WIDTH = 240; // width of leftside toolbar

/**
 * Class implements drawing into canvas
 */
class painter {
    /**
     * Constructor of painter object
    */
    constructor() {
        // set width and height of canvas
        self.width = window.innerWidth - TOOLBAR_WIDTH;
        self.height = window.innerHeight;

        // get the DOM canvas object and its content
        self.canvas_box = document.querySelector('canvas');
        self.canvas_box.width = self.width;
        self.canvas_box.height = self.height;
        self.canvas = self.canvas_box.getContext("2d");

        // set init canvas to white color, so there is not
        // alpha canal
        self.canvas.fillStyle = "white";
        self.canvas.fillRect(0, 0, self.width, self.height);
    }


    /**
     * Method set background of whole canvas
     * @note Setting of background will replace whole canvas,
     *  if there is any drawing, it will be discard (may be taken back
     *  by undo button)
     * @param {string} color 
    */
    set_background(color) {
        self.canvas.fillStyle = color;
        self.canvas.fillRect(0, 0, self.width, self.height);
    }


    /**
     * Method draws one bezier curve with randomly set control points
     * @param {int} width width of random bezier curve
     * @param {string} color color of random bezier curve
     */
    draw_random_bezier_curve(width, color) {
        // generate 4 random coordinates for bezier curve
        let cp0x = this.random_x();
        let cp0y = this.random_y();
        let cp1x = this.random_x();
        let cp1y = this.random_y();
        let cp2x = this.random_x();
        let cp2y = this.random_y();
        let cp3x = this.random_x();
        let cp3y = this.random_y();
        // invoke drawing of bezier curve
        this.draw_bezier_curve(cp0x, cp0y, cp1x, cp1y, cp2x, cp2y, cp3x, cp3y, width, color);
    }


    /**
     * Draws one bezier curve according to given control points coordinates
     * @param {int} cp0x x-axe of 0. control point
     * @param {int} cp0y y-axe of 0. control point
     * @param {int} cp1x x-axe of 1. control point
     * @param {int} cp1y y-axe of 1. control point
     * @param {int} cp2x x-axe of 2. control point
     * @param {int} cp2y y-axe of 2. control point
     * @param {int} cp3x x-axe of 3. control point
     * @param {int} cp3y y-axe of 3. control point
     * @param {int} width width of bezier curve
     * @param {int} color color of bezier curve
     */
    draw_bezier_curve(cp0x, cp0y, cp1x, cp1y, cp2x, cp2y, cp3x, cp3y, width, color) {
        // set color
        self.canvas.fillStyle = color;
        self.canvas.strokeStyle = color;
        // draw bezier curve
        self.canvas.beginPath();
        self.canvas.moveTo(cp0x, cp0y - width);
        self.canvas.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, cp3x, cp3y + width);
        self.canvas.lineTo(cp3x, cp3y + width * 2);
        self.canvas.bezierCurveTo(cp2x, cp2y + width, cp1x, cp1y + width, cp0x, cp0y);
        self.canvas.lineTo(cp0x, cp0y);
        self.canvas.closePath();
        self.canvas.fill();
        self.canvas.stroke();
    }


    /**
     * Method draws dot in random coordinates
     * @param {int} radius radius of random dot
     * @param {string} color color of random dot
     */
    draw_random_dot(radius, color) {
        // generate random center of circle
        let cx = this.random_x();
        let cy = this.random_y();
        // invoke drawing of random circle
        this.draw_dot(cx, cy, radius, color);
    }


    /**
     * Method draws dot on specified coordinate
     * @param {int} cx x-axe of center coordinate
     * @param {int} cy y-axe of center coordinate
     * @param {int} r radius of circle
     * @param {string} color color of circle
     */
    draw_dot(cx, cy, r, color) {
        // set color
        self.canvas.fillStyle = color;
        self.canvas.strokeStyle = color;
        // draw circle (aka dot)
        self.canvas.beginPath();
        self.canvas.arc(cx, cy, r, 0, 2 * Math.PI);
        self.canvas.stroke();
        self.canvas.fill();
    }


    /**
     * Method returns random x-axe coordinate
     * @returns integer specifiing x-axe coordinate of canvas
     */
    random_x() {
        return Math.floor(Math.random() * self.width)
    }


    /**
     * Method returns random y-axe coordinate
     * @returns integer specifiing y-axe coordinate of canvas
     */
     random_y() {
        return Math.floor(Math.random() * self.height)
    }


    /**
     * Method returns copy of canvas
     * @returns {canvas} canvas DOM element
     */
    get_canvas() {
        // create new canvas element
        var new_canvas_box = document.createElement('canvas');
        var new_canvas = new_canvas_box.getContext('2d');

        // copy old canvas to new canvas
        new_canvas_box.width = self.canvas_box.width;
        new_canvas_box.height = self.canvas_box.height;
        new_canvas.drawImage(self.canvas_box, 0, 0);

        return new_canvas_box;
    }

    
    /**
     * Method sets canvas, which is inserted into actuall canvas
     * @param {canvas} new_canvas 
     */
    set_canvas(new_canvas) {
        self.canvas.drawImage(new_canvas, 0, 0);
    }
}
