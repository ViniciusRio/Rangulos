export class Event {
    constructor(
        public id: string,
        public name: string,
        public about: string,
        public adicionalInformation: string,
        public entertainment: string,
        public food: string,
        public price: number,
        public startDate: Date,
        public endDate: Date,
        public numberGuests: number,
        public verifiedPayment: boolean,
        public iCreated: boolean,
        public urlImage: string
    ) {}
}
