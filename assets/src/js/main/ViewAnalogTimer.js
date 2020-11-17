export default class ViewAnalogTimer {

    constructor() {
        this.slug = 'analog-countdown-timer';
        this.items = 20;
        this.setTemplateItems();
        this.setTemplate();
    }

    getTemplate() {
        return this.template;
    }

    setTemplateItems() {
        this.templateItems = '';
        for(let i=1; i <= this.items; i++) {
            this.templateItems += `<div class="${this.slug}__item"></div>`;
        }
    }

    setTemplate() {
        this.template = `
            <div class="${this.slug}">
                <div class="${this.slug}__list">
                   ${this.templateItems}
                </div>
            </div>`;
    }
}