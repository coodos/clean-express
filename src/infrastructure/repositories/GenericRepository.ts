import {
    DeepPartial,
    EntityTarget,
    FindOptionsWhere,
    Repository,
} from "typeorm";
import { BaseEntity } from "@/domain/entities";
import { AppDataSource } from "@/infrastructure";

export class GenericRepository<T extends BaseEntity> {
    protected repository: Repository<T>;

    constructor(private Entity: EntityTarget<T>) {
        this.repository = AppDataSource.getRepository(this.Entity);
    }

    async create(entity: DeepPartial<T>): Promise<T> {
        const entityCreate = this.repository.create(entity);
        await this.repository.save(entityCreate);
        return entityCreate;
    }
    async findMany(options: FindOptionsWhere<T>): Promise<T[]> {
        const entities = await this.repository.find({ where: options });
        return entities;
    }

    async findOne(options: FindOptionsWhere<T>): Promise<T> {
        const entity = await this.repository.findOne({ where: options });
        return entity;
    }

    async findById(id: number): Promise<T> {
        const entity = await this.repository.findOne({
            where: { id } as unknown as FindOptionsWhere<T>,
        });
        return entity;
    }

    async findByIdAndUpdate(id: number, entity: T): Promise<T> {
        const current = await this.findById(id);
        await this.repository.update(id, { ...current, ...entity } as any);
        return entity;
    }

    async findByIdAndDelete(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    protected getEntityType(): EntityTarget<T> {
        return this.Entity;
    }
}
