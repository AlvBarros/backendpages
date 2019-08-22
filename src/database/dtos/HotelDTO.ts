import Hotel from "../../business/hotel/Hotel";
import HotelFactory from "../../business/hotel/HotelFactory";
import DTO from "../../business/templates/DTO";
import CloudantIndex from "../cloudant/CloudantIndex";

export class HotelDTO extends DTO {
    public indexes: CloudantIndex[];
    public hotelFactory = new HotelFactory();

    constructor() {
        super("hotel");
    }
    public register(hotel: Hotel): Promise<boolean> {
        return super.insert(hotel);
    }
    public async queryByName(name: string): Promise<Hotel[]> {
        return this.query("name", name).then((result) => {
            if (result.docs.length > 0) {
                return result.docs.map((doc) => {
                    return this.hotelFactory.generateHotelFromDoc(doc);
                });
            } else {
                return new Array<Hotel>();
            }
        }).catch((err) => { throw err; });
    }
    public query(field: string, value: string): Promise<IHotelQueryResult> {
        return this.cloudant.query(field, value);
    }
}
export default HotelDTO;
