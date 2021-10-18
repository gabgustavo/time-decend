export class TimeDecend {

    seconds = 0;
    unformattedSeconds = 0;
    minutes = 0;
    hours = 0;
    days = 0;

    constructor(date, settings = {}) {
        this.date = this.getValidDate(date);
        this.dateNow = new Date().getTime();
        this.interval = setInterval(this.render, 1000);

        this.settings = {
            container: (settings.container ? settings.container : '.lg--clock-descend'),
            labelSeconds: (settings.labelSeconds ? settings.labelSeconds : 'Seconds'),
            labelMinutes: (settings.labelSeconds ? settings.labelSeconds : 'Minutes'),
            labelHours: (settings.labelSeconds ? settings.labelSeconds : 'Hours'),
            labelDays: (settings.labelSeconds ? settings.labelSeconds : 'Days'),
            redirectAfterFinishing: (settings.redirectAfterFinishing ? settings.redirectAfterFinishing : ''),
            messageAfterFinishing: (settings.messageAfterFinishing ? settings.messageAfterFinishing : ''),
            timeBeforeRedirecting: (settings.timeBeforeRedirecting ? Number(settings.timeBeforeRedirecting) : 5000),
            waitingTime: (settings.waitingTime ? Number(settings.waitingTime) : 3000),

        };
    }

    /**
     * 
     * @param {*} date | string date
     * @param {*} milliseconds true | false
     * @returns int / string of date
     */
    getValidDate = (date) => {
        try {
            let tempDate = new Date(date);
            if(tempDate != 'Invalid Date') {
                return tempDate.getTime();
            }
            let arratDate = date.split('/')
            if(arratDate.length === 3) {
                tempDate = new Date(`${arratDate[1]}/${arratDate[0]}/${arratDate[1]}`);
                //return tempDate.getTime();
                return 0;
            }
            return date;

        } catch (error) {
            return error.message;
        }
    }

    _seconds = () => {
        this.dateNow = new Date().getTime();

        let milliseconds = this.date - this.dateNow;
        this.unformattedSeconds = Math.floor(milliseconds / 1000);
        return this.seconds = this.unformattedSeconds % 60;
    }

    _minutes = () => {
        return this.minutes = Math.floor((this.unformattedSeconds / 60) % 60);
    }

    _hours = () => {
        return this.hours = Math.floor((this.unformattedSeconds / (60 * 60)) % (60 * 60) % 24);
    }

    _days = () => {
        return this.days = Math.floor((this.unformattedSeconds / (24 * 60 * 60)) % (60 * 60));
    }
    _showMessage(html) {
        let obj = this;
        if(this.unformattedSeconds <= 0) {
            setTimeout(function() {
                const $clockContainersListAsArray = [...document.querySelectorAll(obj.settings.container)];
                $clockContainersListAsArray.forEach(container => {
                    container.innerHTML = html;
                });
            }, obj.settings.waitingTime);
        }
    }
    _redirect() {
        let obj = this;
        if(this.settings.redirectAfterFinishing) {
            setTimeout(function() {
                window.location.href = obj.settings.redirectAfterFinishing;
            }, obj.settings.timeBeforeRedirecting);
        }
    }

    render = () => {
        let seconds =  this._seconds();
        this._minutes();
        this._hours();
        this._days();

        let numberDays = ('0' + this.days).slice(-2);
        if(this.days > 99) numberDays = ('0' + this.days).slice(-3);
        if(this.days > 999) numberDays = ('0' + this.days).slice(-4);

        let html = ` 
        <div class="lg--container-clock-descend">
            <div class="digits">
                <span class="lg--item-digits">
                    <span class="lg--print-days-label">${this.settings.labelDays}</span>
                    <span class="lg--print-days-number">${(numberDays < 0 ? '00' : numberDays)}</span>
                </span>
                <span class="lg--item-digits">
                    <span class="lg--print-hours-label">${this.settings.labelHours}</span>
                    <span class="lg--print-hours-number">${(this.hours < 0 ? '00': ('0' + this.hours).slice(-2))}</span>
                </span>
                <span class="lg--item-digits">
                    <span class="lg--print-minutes-label">${this.settings.labelMinutes}</span>
                    <span class="lg--print-minutes-number">${(this.minutes < 0 ? '00': ('0' + this.minutes).slice(-2))}</span>
                </span>
                </span>
                <span class="lg--item-digits">
                    <span class="lg--print-seconds-label">${this.settings.labelSeconds}</span>
                    <span class="lg--print-seconds-number">${(this.seconds < 0 ? '00' : ('0' + this.seconds).slice(-2))}</span>
                </span>
            </div>
        </div>
        `;

        let htmlAfterFinishing = `
            <div class="lg--container-clock-descend">
                <div class="digits">
                    <div class="message">
                        <p>
                            ${this.settings.messageAfterFinishing}
                        </p>
                    </div>
                </div>
            </div>
            `;

        const $clockContainersListAsArray = [...document.querySelectorAll(this.settings.container)];
        $clockContainersListAsArray.forEach(container => {
            container.innerHTML = html;
        });

        if(this.unformattedSeconds <= 0) {
            clearInterval(this.interval);
            this._showMessage(htmlAfterFinishing);
            this._redirect();
        }
    }

}