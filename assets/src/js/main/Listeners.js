export default class Listeners {

    constructor(data, events, browserParams) {
        this.data = data;
        this.events = events;
        this.browserParams = browserParams;
        this.config = this.events.config;
        this.$closeSelector = document.querySelector(`.${this.config.selector}__close`);
        this.$minimizeSelector = document.querySelector(`.${this.config.selector}__minimize`)
    }

    onLoad() {
        switch (this.events.status.getView()) {
            case 'minimize':
                this.events.minimize();
                break;
            default:
                this.events.show();
                break;
        }

        return this;
    }

    timerLoad() {
        const self = this;
        let time = (this.browserParams.touch) ? this.data.mobileLoadSec : this.data.desktopLoadSec;
        this.timer = window.setTimeout(function (){
            self.events.show();
        }, parseInt(time) * 1000);

        return this;
    }

    mouseTopOut() {
        const self = this;
        const event = function( e ) {
            if (e.clientY <= 0) {
                self.events.show();
                document.body.removeEventListener("mouseout", event);
                clearTimeout(this.timer);
            }
        }
        document.body.addEventListener("mouseout", event);

        return this;
    }

    minimize() {
        const self = this;
        self.$minimizeSelector.addEventListener("click", function( e ) {
            self.events.minimize();
        })

        return this;
    }

    close() {
        const self = this;
        self.$closeSelector.addEventListener("click", function( e ) {
            self.events.close();
        })

        return this;
    }

}