import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";
import { BaseEntity } from "@/domain/entities";
import bcrypt from "bcryptjs";

@Entity()
export class User extends BaseEntity {
    @Column({ nullable: true })
    name?: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    async savePassword() {
        if (this.password) {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }
    }
}
