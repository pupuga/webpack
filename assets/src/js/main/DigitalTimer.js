export default class DigitalTimer {

    constructor(time, callback = null) {
        this.slug = 'digital-countdown-timer';
        this.isRun = false;
        this.isEnd = false;
        this.callback = callback;
        this.seconds = 0;
        this.time = (parseInt(time.replace(':')) > 5959 || typeof(time) == 'undefined' ) ? '00:59' : time;
        this.ids = this.setIds();
        this.default();
    }

    setIds() {
        return {
            minutes: {
                current: parseInt(this.time[0]),
                max: 6,
                active: null
            },
            minute: {
                current: parseInt(this.time[1]),
                max: 10,
                active: null
            },
            seconds: {
                current: parseInt(this.time[3]),
                max: 6,
                active: null
            },
            second: {
                current: parseInt(this.time[4]),
                max: 10,
                active: null
            }
        };
    }

    default() {
        for (let id in this.ids) {
            let child = this.ids[id].max - this.ids[id].current;
            let active = document.querySelector(`.${this.slug}__flip--${id} .${this.slug}__digit:nth-child(${child})`);
            this.setActive(active);
        }
        this.setActiveNumber();

        return this;
    }

    setActiveNumber()
    {
        for (let id in this.ids) {
            this.ids[id].active = parseInt(document.querySelector(`.${this.slug}__flip--${id} .${this.slug}__digit--active .${this.slug}__inn--up`).innerHTML);
        }
    }

    end() {
        return this.isEnd;
    }

    run() {
        return this.isRun;
    }

    start() {
        const self = this;
        if (!this.isRun && !this.isEnd) {
            this.isRun = true;
            this.interval = setInterval(function () {
                self.setActiveNumber();
                self.play('second')
                self.seconds++;
                if (self.ids.second.active === 0) {
                    self.play('seconds');
                    if (self.ids.seconds.active === 0) {
                        self.play('minute');
                        if (self.ids.minute.active === 0) {
                            self.play('minutes');
                        }
                    }
                }
            }, 1000);

            this.setPlay(document.querySelector(`.${this.slug}`));
        }

        return this
    }

    stop() {
        clearInterval(this.interval);
        this.isRun = false;

        return this;
    }

    play(id) {

        let before = document.querySelector(`.${this.slug}__flip--${id} .${this.slug}__digit--active`);
        let active;

        if (id === 'second') {
            this.checkTime();
        }

        if (!this.isEnd) {
            if (before === null) {
                before = document.querySelector(`.${this.slug}__flip--${id} .${this.slug}__digit`);
                active = before.nextElementSibling;
            } else if (before.nextSibling === null) {
                this.removeBefore(id);
                active = document.querySelector(`.${this.slug}__flip--${id} .${this.slug}__digit`);
            } else {
                this.removeBefore(id);
                active = before.nextElementSibling;
            }

            this.setBefore(before);
            this.setActive(active);
        }
    }

    checkTime() {
        let stop = true;
        for (let id in this.ids) {
            if (this.ids[id].active === null || this.ids[id].active !== 0) {
                stop = false;
                break;
            }
        }
        if (stop) {
            this.stop();
            this.isEnd = true;
            if (this.callback !== null && typeof(this.callback) !== 'undefined') {
                this.callback();
            }
        }
    }

    removeBefore(id) {
        let before = document.querySelector(`.${this.slug}__flip--${id} .${this.slug}__digit--before`);
        if (before !== null) {
            before.classList.remove(`${this.slug}__digit--before`)
        }
    }

    setBefore(node) {
        node.classList.add(`${this.slug}__digit--before`);
        node.classList.remove(`${this.slug}__digit--active`);
    }

    setActive(node) {
        node.classList.add(`${this.slug}__digit--active`);
    }

    setPlay(node) {
        node.closest(`.${this.slug}`).classList.add(`${this.slug}--play`);
    }
}