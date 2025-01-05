export{}

// Extends the Date interface for the whole project
declare global {
    interface Date {
        addDays(d: number): Date;
        toISODateString(): string;
    }
}

(function () {
    Date.prototype.addDays = function (days: number): Date {
        const d = new Date(this);
        d.setDate(d.getDate() + days);
        return d;
    }

    Date.prototype.toISODateString = function (): string {
        return this.toISOString().substring(0,10);
    }
})();


