// Extends the String interface for the whole project
declare global {
    interface StringConstructor {
        nullOrBlank(s: string): boolean;
    }
}

(function () {
    String.nullOrBlank = function(s: string): boolean {
        return (s ?? '').trim().length === 0;
    };
})();

export {}