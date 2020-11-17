export default class ViewDigitalTimer {

    constructor() {
        this.slug = 'digital-countdown-timer';
        this.setTemplateMinutes();
        this.setTemplateMinute();
        this.setTemplateSeconds();
        this.setTemplateSecond();
        this.setTemplate();
    }

    getTemplate() {
        return this.template;
    }

    setTemplate()
    {
        this.template = `
            <div class="${this.slug}">
                ${this.templateMinutes}
                ${this.templateMinute}
                <div class="${this.slug}__delimiter"></div>
                ${this.templateSeconds}
                ${this.templateSecond}
            </div>`;
    }

    setTemplateMinutes() {
        this.templateMinutes = this.setTemplateDigitalBlock(5, 0, 'minutes');
    }

    setTemplateMinute() {
        this.templateMinute = this.setTemplateDigitalBlock(9, 0, 'minute');
    }

    setTemplateSeconds() {
        this.templateSeconds = this.setTemplateDigitalBlock(5, 0, 'seconds');
    }

    setTemplateSecond() {
        this.templateSecond = this.setTemplateDigitalBlock(9, 0, 'second');
    }

    setTemplateDigitalBlock(startDigit, endDigit, id) {
        let template = '';
        for (let digit = startDigit; digit >= endDigit; digit--) {
            template += this.setTemplateDigit(digit);
        }

        return `<div class="${this.slug}__flip ${this.slug}__flip--${id}">${template}</div>`;
    }

    setTemplateDigit(digit) {
        return `
            <div class="${this.slug}__digit">
                <div class="${this.slug}__animation">
                    <div class="${this.slug}__up">
                        <div class="${this.slug}__shadow ${this.slug}__shadow--up"></div>
                        <div class="${this.slug}__inn ${this.slug}__inn--up">${digit}</div>
                    </div>
                    <div class="${this.slug}__down">
                        <div class="${this.slug}__shadow ${this.slug}__shadow--down"></div>
                        <div class="${this.slug}__inn  ${this.slug}__inn--down">${digit}</div>
                    </div>
                </div>
            </div>`
    }
}