export default class Cookie {

    constructor(name) {
        this.name = name;
    }

    set(value, days = 365) {
        days = days * 24 * 60 * 60 * 1000;
        let date = new Date();
        date.setTime(date.getTime() + days);
        let expires = "expires=" + date.toUTCString();
        document.cookie = `${this.name}=${value};${expires};path=/`;
    }

    get() {
        let self = this;
        let matches = document.cookie.match(
            new RegExp(
                "(?:^|; )" + self.name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
            )
        );

        return matches ? decodeURIComponent(matches[1]) : false;
    }

    clear() {
        this.set('', -1);
    }

    check(value, days = 365) {
        if (this.get() === '') {
            this.set(value, days);
        }
    }

}