import config from "../config";
import ViewMain from "./ViewMain";
import Status from "./Status";
import Listeners from "./Listeners";
import DigitalTimer from "./DigitalTimer";
import Events from "./Events";

class Init {

    constructor() {
        if (typeof (dataExitPopup) !== 'undefined') {
            this
                ._setDataObject(dataExitPopup)
                ._setConfig()
                ._setBrowserParams()
                ._setStatusObject();
            if (this.status.getView() !== 'close') {
                this
                    ._setViewObject()
                    ._onLoad();
            }
        }
    }

    _setDataObject(data) {
        this.data = data;

        return this;
    }

    _setConfig() {
        this.config = config;

        return this;
    }

    _setBrowserParams() {
        this.browserParams = {
            mac: navigator.appVersion.indexOf("Mac") !== -1,
            touch : 'ontouchstart' in window || 'onmsgesturechange' in window
        };

        return this;
    }

    _setStatusObject() {
        this.status = new Status(this.data, this.config);

        return this;
    }

    _setViewObject() {
        this.view = new ViewMain(this.data, this.config, this.browserParams);

        return this;
    }

    _onLoad() {
        if (this.status.getEvent() === 'code') {
            this.events = new Events(this.config, false, this.status);
            this._setSection(this.view.getTemplateCode());
            this.Listeners = new Listeners(this.data, this.events, this.browserParams);
            this.Listeners
                .onLoad()
                .minimize()
                .close();
        } else {
            if (this.status.getEvent() !== 'timer') {
                this.status.setEventLoad();
            }
            this._setSection(this.view.getTemplateTimer());
            this.events = new Events(this.config, this._setTimer(), this.status);
            this.Listeners = new Listeners(this.data, this.events, this.browserParams);
            if (this.status.getEvent() !== 'timer') {
                this.Listeners
                    .timerLoad()
                    .mouseTopOut();
            } else {
                this.Listeners
                    .onLoad();
            }
            this.Listeners
                .minimize()
                .close();
        }
    }

    _setSection(template) {
        document.querySelector(`.${this.config.selector}__section`).innerHTML = template;
    }

    _setTimer() {
        let self = this;
        return new DigitalTimer(this.data.time, function () {
            self._setSection(self.view.getTemplateCode());
            self.status.setEventCode();
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    new Init();
});