import HotelConfig from "../../config/databases/hotel.json";
import HotelFactory from "../../factories/HotelFactory";
import CloudantIndex from "../../templates/cloudant/CloudantIndex";
import { DTO } from "../../templates/DTO";
import Hotel from "./Hotel";

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
