import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Exercise extends BaseEntity {
  @PrimaryGeneratedColumn({
    comment: 'The exercise unique identifier',
  })
  id: number;

  @Column({
    comment: 'The name of the exercise',
    type: 'varchar',
    unique: true,
  })
  name: string;

  @Column({
    comment: 'The list of muscles hit by the exercise',
    type: 'simple-array',
  })
  muscles: string[];

  @Column({
    comment: 'The exercise score given by the system',
    type: 'float',
    default: 0.0,
  })
  score: number;
}
