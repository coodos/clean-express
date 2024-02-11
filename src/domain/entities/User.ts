import { Column, Entity } from "typeorm";
import { BaseEntity } from "@/domain/entities";

@Entity()
export class User extends BaseEntity {
    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;
}
