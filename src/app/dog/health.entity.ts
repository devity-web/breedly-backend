import {BaseEntity} from 'src/utils/base-entity';
import {Column, Entity, ManyToOne, type Relation} from 'typeorm';
import {Dog} from './dog.entity';

@Entity()
export class Health extends BaseEntity {
  @Column()
  kind: string;

  @Column()
  who: string;

  @ManyToOne(
    () => Dog,
    dog => dog.id,
    {nullable: false},
  )
  dog: Relation<Dog>;
}
