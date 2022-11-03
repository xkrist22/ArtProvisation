/**
 * @file stack.js
 * @author Jiri Kristof <xkrist22@stud.fit.vutbr.cz>
 * @date October 2022
 * @brief Method implements stack abstract data type for storing of the history
 */

const EMPTY_STACK = -1;

/**
 * Class implements abstract data type stack
 */
class stack {
    /**
     * Constructor of the empty stack
     */
    constructor() {
        self.stack = [];
        self.head = EMPTY_STACK;
    }


    /**
     * Method push element to the head of the stack
     * @param {*} elem element to be pushed into stack
     */
    push(elem) {
        self.head++;
        self.stack[self.head] = elem;
    }


    /**
     * Method remove and return element from
     *  the head of the stack
     * 
     * @returns {*} element from the top of the stack
     */
    pop() {
        // check if there is any element
        if (self.head == EMPTY_STACK) {
            return null;
        }

        self.head--;
        return self.stack[self.head + 1];
    }


    /**
     * Method returns element from the head of the
     *  stack, but it does not remove head element
     * 
     * @returns {*} element from the top of the stack
     */
    head() {
        // check if there is any element
        if (self.head == EMPTY_STACK) {
            return null;
        }

        return self.stack[self.head];
    }

    
    /**
     * Method returns length of stack
     * @returns {int} number of elements in stack
     */
    len() {
        return self.head + 1;
    }
}
