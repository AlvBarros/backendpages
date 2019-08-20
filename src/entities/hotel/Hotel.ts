export class Hotel implements IHotelDoc{
    public _id: string;
    public _rev: string;
    public name: string;
    public location: { cep: string, address: string };
}
export default Hotel;