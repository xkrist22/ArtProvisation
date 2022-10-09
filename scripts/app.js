/**
 * Class encapsulates whole app funcionality
 */
class app {
    /**
     * Constructor of the app class
     */
    constructor() {
        // on init disable undo button
        document.getElementById("undo_button").disabled = true;
        // create new history stack
        self.app_history = new stack();
        self.painter = new painter();
    }


    select_file() {
        document.getElementById("file_input").click();
    }

    /**
     * Method for loading the art from file
     */
    load(input) {
        if (input.value == "" && !input.name.endsWith(".png")) {
            // TODO some error prompt
            return;
        }

        let image_source = window.URL.createObjectURL(input.files[0]);
        let image = new Image();
        image.onload = function () {
            self.painter.set_canvas(image);
        }
        image.src = image_source;
    }


    /**
     * Method for saving the art to file
     */
    save() {
        let link = document.createElement('a');
        link.download = 'canvas.png';
        link.href = document.querySelector('canvas').toDataURL('image/png');
        link.click();
    }


    /**
     * Method implements undo button funcionality
     */
    undo() {
        // cannot undo if there is no history
        if (self.app_history.len() == 0) {
            return;
        }

        // take previous version of canvas from history
        let prev = self.app_history.pop();
        self.painter.set_canvas(prev);

        // if there is no history, then disable undo button
        if (self.app_history.len() == 0) {
            document.getElementById("undo_button").disabled = true;
        }
    }

    /**
     * Method redirects to "about app" info page
     */
    about() {
        window.location.href = "about.html";
    }

    /**
     * Method invokes change of background
     */
    change_bg() {
        // add previous version of canvas to history
        self.app_history.push(self.painter.get_canvas());
        // make the "undo" button enabled
        document.getElementById("undo_button").disabled = false;

        // take color of bg
        let color = document.getElementById("bg_color").value;
        // invoke setting of background
        self.painter.set_background(color);
    }

    /**
     * Method invokes drawing of specified element
     * @param {string} element string describing desired
     *  element to be generated ("curves" or "dots")
     */
    draw(element) {
        // add previous version of canvas to history
        self.app_history.push(self.painter.get_canvas());
        // make the "undo" button enabled
        document.getElementById("undo_button").disabled = false;

        // take input numbers from toolbar
        let width_from = document.getElementById("width_from").value;
        let width_to = document.getElementById("width_to").value;
        let num = document.getElementById("num").value;
        let color = document.getElementById("curve_color").value;

        // generate elements
        for (let i = 0; i < num; i++) {
            // for each element, generate its own width
            let random_width = this.get_random_int(width_from, width_to);
            if (element == "curves") {
                // draw one curve
                self.painter.draw_random_bezier_curve(random_width, color);
            }
            else if (element == "dots") {
                // draw one dot
                self.painter.draw_random_dot(2 * random_width, color);
            }
        }
    }

    /**
     * Method generates random integer number
     * 
     * @param {int} min minimum number which can be generated
     * @param {int} max maximum number which can be generated
     * @returns {int} random number from interval <min;max>
     */
    get_random_int(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

// create app handler
let gui = new app();

/**
 * Event listener, on ctrl+z undo
 */
document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && e.key === 'z') {
        gui.undo();
    }
});

