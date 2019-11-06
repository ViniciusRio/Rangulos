export class Event {
    constructor(
        public id: string,
        public title: string,
        public about: string,
        public address: string,
        public price: number,
        // tslint:disable-next-line: variable-name
        public max_guests: number,
        // tslint:disable-next-line: variable-name
        public start_date: Date,
        // tslint:disable-next-line: variable-name
        public end_date: Date,
        // tslint:disable-next-line: variable-name
        public url_image: string,
        // tslint:disable-next-line: variable-name
        public user_creator_id: number
    ) {}
}
