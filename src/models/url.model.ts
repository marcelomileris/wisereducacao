import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Url {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    public url:string;

    @Column()
    short:string;

    @CreateDateColumn({type:'timestamp'})
    expire:Date;
}
