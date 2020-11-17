export default class Events {

    constructor(config, timer, status) {
        this.config = config;
        this.$selector = document.querySelector(`.${this.config.selector}`);
        this.timer = timer;
        this.status = status;
    }

    show() {
        let self = this;
        this.$selector.classList.add(`${this.config.selector}--show`);
        this.$selector.classList.remove(`${this.config.selector}--minimize`);
        this.status.setViewShow();
        if (this.timer !== false && this.timer.end !== true) {
            this.timer.start();
            self.status.setEventTimer();
        }
    }

    close() {
        this.$selector.classList.remove(`${this.config.selector}--show`);
        this.status.setViewClose();
        this.status.setEventLoad();
        if (this.timer !== false && this.timer.end !== true) {
            this.timer.stop();
        }
    }

    minimize() {
        if (this.$selector.classList.contains(`${this.config.selector}--minimize`)) {
            this.show();
        } else {
            this.$selector.classList.add(`${this.config.selector}--show`);
            this.$selector.classList.add(`${this.config.selector}--minimize`);
            this.status.setViewMinimize();
            if (this.timer !== false && this.timer.end !== true) {
                this.timer.stop();
            }
        }
    }
}