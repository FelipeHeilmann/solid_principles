export default class Period {
    private start: Date
    private end: Date

    constructor(startDate: string, endDate: string) {
        this.start = new Date(startDate)
        this.end = new Date(endDate)
    }

    getStart() {
        return this.start
    }

    getEnd() {
        return this.end
    }
}