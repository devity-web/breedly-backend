import {BaseEntity} from 'src/utils/base-entity';
import {Column, Entity, ManyToOne, type Relation} from 'typeorm';
import {Dog} from './dog.entity';

@Entity()
export class Weight extends BaseEntity {
  @Column('float')
  value: number;

  @ManyToOne(
    () => Dog,
    dog => dog.id,
    {nullable: false},
  )
  dog: Relation<Dog>;
}
