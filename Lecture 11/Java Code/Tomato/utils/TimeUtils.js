export class TimeUtils {
    static getCurrentTime() {
        const now = new Date();
        return now.toString(); // Simplified format, or use a library like date-fns/moment if needed, but toString is fine for now matching the Java output roughly
    }
}
