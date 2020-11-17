import ViewDigitalTimer from "./ViewDigitalTimer";
import ViewAnalogTimer from "./ViewAnalogTimer";

export default class ViewMain {

    constructor(data, config, browserParams) {
        this.data = data;
        this.config = config;
        this.browserParams = browserParams;
        this.templateDigitalClock = (new ViewDigitalTimer).getTemplate();
        this.templateAnalogClock = (new ViewAnalogTimer).getTemplate();
        this.setStyle();
        this.setTemplateTimer();
        this.setTemplateCode();
        this.setTemplate();
        this.insert();
    }

    getTemplateTimer() {
        return this.timer;
    }

    getTemplateCode() {
        return this.code;
    }

    setStyle() {
        this.style = `<style>.${this.config.selector} {
                    --border-radius: ${this.data.style.borderRadius || 11}px;
                    --background-color: ${this.data.style.backgroundColor || '#fff'}; 
                    --font-family: ${(this.data.style.getFontFamily) ? window.getComputedStyle(document.body, null).getPropertyValue('font-family') : 'Helvetica,Arial,sans-serif'};
                    --timer-title-font-color: ${this.data.style.timerTitleFontColor || '#000'};
                    --timer-font-color: ${this.data.style.timerFontColor || '#cd171b'};
                    --timer-digit-color: ${this.data.style.timerDigitColor || '#fff'};
                    --timer-digit-background-color: ${this.data.style.timerDigitBackgroundColor || '#333'};
                    --timer-analog-point-color: ${this.data.style.timerAnalogPointColor || '#969696'};
                    --code-title-font-color: ${this.data.style.codeTitleFontColor || '#000'};
                    --code-font-color: ${this.data.style.codeFontColor || '#000'};
                    --code-code-font-color: ${this.data.style.codeCodeFontColor || '#cd171b'};
                    --help-font-color: ${this.data.style.helpFontColor || '#979797'};
                    --close-button-color: ${this.data.style.closeButtonColor || '#979797'};
                    --minimize-button-color: ${this.data.style.minimizeButtonColor || '#fff'};
                    --minimize-button-background-color: ${this.data.style.minimizeButtonBackgroundColor || '#cd171b'};
                }</style>`;
    }

    setTemplateTimer() {
        this.timer =  `<div class="${this.config.selector}__main ${this.config.selector}__main--timer">
            <div class="${this.config.selector}__title ${this.config.selector}__title--timer">${this.data.timerTitle}</div>
            <div class="${this.config.selector}__description ${this.config.selector}__description--attention">${this.data.timerDescription}</div>
            <div class="${this.config.selector}__digital-clock">${this.templateDigitalClock}</div>
            <div class="${this.config.selector}__round-clock">${this.templateAnalogClock}</div>
            <div class="${this.config.selector}__image ${this.config.selector}__image--timer"><img src="data:image/${this.data.timerImageExt};base64,${this.data.timerImage}"></div>
        </div>`
    }

    setTemplateCode() {
        this.code = `<div class="${this.config.selector}__main ${this.config.selector}__main--code">
            <div class="${this.config.selector}__title ${this.config.selector}__title--code">${this.data.codeTitle}</div>
            <div class="${this.config.selector}__description">${this.data.codeDescription}</div>
            <div class="${this.config.selector}__code">${this.data.code}</div>
            <div class="${this.config.selector}__image ${this.config.selector}__image--code"><img src="data:image/${this.data.codeImageExt};base64,${this.data.codeImage}"></div>
        </div>`
    }

    setTemplate() {
        this.template = `<div class="${this.config.selector} ${this.config.selector}--${(this.browserParams.mac) ? 'mac' : 'not-mac'}">
            <div class="${this.config.selector}__window">
                <div class="${this.config.selector}__header">
                    <div class="${this.config.selector}__helper-text">${this.data.headerText}</div>
                    <div class="${this.config.selector}__close ${this.config.selector}__close--${(this.browserParams.mac) ? 'mac' : 'not-mac'}"></div>
                </div>
                <div class="${this.config.selector}__section">${this.timer}</div>
                <div class="${this.config.selector}__footer">
                    <div class="${this.config.selector}__helper-text">${this.data.footerText}</div>
                </div>
            </div>
            <div class="${this.config.selector}__minimize"></div>
        </div>`;
    }

    insert() {
        document.body.insertAdjacentHTML('beforeend', this.style + this.template);
    }
}