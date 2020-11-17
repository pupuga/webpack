import Cookie from "./Cookie";

export default class Status {

    constructor(data, config) {
        this.data = data;
        this.config = config;
        this.cookieView = new Cookie(this.config.cookieViewName);
        this.cookieEvent = new Cookie(this.config.cookieEventName);
    }

    setViewShow() {
        this.cookieView.set('show', this.data.memoryDays);
    }

    setViewMinimize() {
        this.cookieView.set('minimize', this.data.memoryDays);
    }

    setViewClose() {
        this.cookieView.set('close', this.data.memoryCloseDays);
    }

    setEventLoad() {
        this.cookieEvent.set('load', this.data.memoryDays);
    }

    setEventTimer() {
        this.cookieEvent.set('timer', this.data.memoryDays);
    }

    setEventCode() {
        this.cookieEvent.set('code', this.data.memoryDays);
    }

    getView() {
        return this.cookieView.get();
    }

    getEvent() {
        return this.cookieEvent.get();
    }
}