// Extends the String interface for the whole project
declare global {
    interface StringConstructor {
        nullOrBlank(s: string | null | undefined): boolean;
    }
}

(function () {
    String.nullOrBlank = function(s: string | null | undefined): boolean {
        return (s ?? '').trim().length === 0;
    };
})();

export {}