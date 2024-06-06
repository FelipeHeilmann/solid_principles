export default class Period {
    private start: Date
    private end: Date

    constructor(startDate: string, endDate: string) {
        this.start = new Date(startDate)
        this.end = new Date(endDate)
    }

    getDurationInDays() {
        return (this.end.getTime() - this.start.getTime())/(1000*60*60*24)
    }

    getDurationInHours() {
        return (this.end.getTime() - this.start.getTime())/(1000*60*60)
    }

    getStart() {
        return this.start
    }

    getEnd() {
        return this.end
    }
}