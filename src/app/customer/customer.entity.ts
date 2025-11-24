import {BaseEntity} from 'src/utils/base-entity';
import {Column, Entity} from 'typeorm';

@Entity()
export class Customer extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;
}
