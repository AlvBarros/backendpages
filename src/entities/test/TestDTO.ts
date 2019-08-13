import { DTO } from "../../templates/DTO";
import TestEntity from "./TestEntity";

export class TestDTO extends DTO<TestEntity> {

    constructor() {
        super("test");
    }

    public newTestEntity(t: TestEntity): Promise<boolean> {
        return super.insert(t);
    }
}
