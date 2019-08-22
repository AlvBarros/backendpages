import Hotel from "./Hotel";

export class HotelFactory {
    public generateHotelFromRequest(request: any) {
        if (!request.name || !request.location || !request.location.cep || !request.location.address) {
            throw new Error("Invalid input.");
        } else {
            const hotel = new Hotel();
            hotel.name = request.name;
            hotel.location = request.location;
            return hotel;
        }
    }
    public generateHotelFromDoc(doc: IDoc): any {
        throw new Error("Method not implemented.");
    }
}
export default HotelFactory;
