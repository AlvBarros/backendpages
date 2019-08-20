interface IHotelDoc extends IDoc {
    name: string;
    location: { cep: string, address: string };
}

interface IHotelQueryResult {
    docs: IHotelDoc[];
}
