import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

//! one to one 
// import { Vehicle } from "./Vehicles";
// @Entity({
//   name: "users",
// })
// export class User {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({
//     length: 100,
//   })
//   name: string;

//   @Column()
//   email: string;

//   @Column()
//   age: string;

//   @Column()
//   active: boolean;

//   @OneToOne(() => Vehicle)
//   @JoinColumn()
//   vehicle: Vehicle;
// }


//! one to many
import { Vehicle } from "./Vehicles";
@Entity({
  name: "users",
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column()
  email: string;

  @Column()
  age: number;

  @Column()
  active: boolean;

  @OneToMany(() => Vehicle, (vehicle=>vehicle.user))
  vehicles: Vehicle[]
}
