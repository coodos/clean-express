import { BaseEntity, Column, Entity } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;
}
