//** ""TypeORM"" its the library that helps us to communicate with SQL databases */
//**1.- the first step to take is install the library
    // npx typeorm init --name MyProject --database postgres
//! If you have an excising project you need to follow the next steps 
    //? Install the npm package:
    // npm install typeorm --save
    //? You need to install reflect-metadata shim:
    // npm install reflect-metadata --save
    //? and import it somewhere in the global place of your app (for example in app.ts):
    //  import "reflect-metadata" (this should be imported on the index.ts or whatever is needed)
    //? install a database driver:
    // For postgres  npm install pg --save
    //? TypeScript configuration
        //?Also, make sure you are using TypeScript version 4.5 or higher, and you have enabled the following settings in tsconfig.json:
    //"emitDecoratorMetadata": true,
    //"experimentalDecorators": true,
    //"lib":["ES6"],

    //**After you have all dependencies installed, edit the "data-source.ts" file and put your own database connection
    //**(THIS SHOULD BE CREATED IN THE CONFIG FOLDER ) */
    //*configuration options in there: */
        /*
        import { DataSource } from "typeorm";
import { User } from "../entities/User";
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "fernando",
  password: "Amaterasu1@",
  database: "demo",
  dropSchema: true,
  synchronize: true,
  logging: false,
  entities: [User],
  subscribers: [],
  migrations: [],
});

export const UserModel = AppDataSource.getRepository(User);
*/
        // ? ====> YOU CAN ALSO CREATE ANY VARIABLE TO MAKE THE SERVICES EVEN SIMPLER 
        // export const UserModel = AppDataSource.getRepository(User)
    
        //** NOW WE START TO WORK IN PUR INDEX.TS */
             
                // import app from "./server";
                // import { PORT } from "./config/envs";
                // import "reflect-metadata"
                // import { AppDataSource } from "./config/data-source";

                // AppDataSource.initialize()
                // .then(res=>{
                //     console.log("connection has been established");
                //     server.listen(PORT, ()=>{
                //         console.log(`Server listening on port ${PORT}`);
                //     })
                // })

//** The next step is to create our entities */
    // create a folder "entities"
    //! REMEMBER TO NEVER USE "user" IN POSTGRES AS A NAME FOR THE ENTITY
    //! REMEMBER THAT WE HAVE TO CREATE THE "users" ===> entities: [],
    //! IN THE TSCONFIG WE HAVE TO CHANGE "strictPropertyInitialization": false,   

/*
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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
  age: string;
  
  @Column()
  active: boolean;
}
*/
    
//**START TO WORK WITH POSTGRES AND JS  */
// If you already have your controllers and routes set up we have got to work with the services 
    //! GET USERS
            //example:
            // this service returns the info in the database
            /* 
            export constGetUsersService = async ()=>{
                const users = await AppDataSource.getRepository(User).find()
                return users
            }

            example 2 
            export constGetUsersService = async ():Promise<User[]>=>{       <---- we have to use de entity as a return 
                const users = await UserModel.find()
                return users
            }
            */

    //! CREATE USERS

    //example:
            /*
            export createUserService = async (userData: UserDto)=>{
                const user = await AppDataSource.getRepository(User).create(userData)
                const results = await AppDataSource.getRepository(User).save(user)
                return user
            }

            Example 2
            export const createUserService = async (userData: UserDto)=>{
                const user = await UserModel.create(userData)
                const results = await UserModel.save(user)
                return user
            }

            */
    
     //! GET USERS BY ID

     /* 

      Example 2
      CONTROLLER 
            export getUsersByIS = async (req:Request, res:Response)=>{
               const {id} = req.params
                const user : User | null = await getUserServiceById(Number(id))  "User"<==== since we are not using the interfaces we have to modify it with the User entity
                res.status(200).json(user)
            }
        :Promise<User[]>
            SERVICE

            export const getUserById = async ():Promise<User|null>=>{
                const user = await UserModel.findOneBy({
                    id
                })
                return user
            }
            
            */

//**RELATIONS BETWEEN ENTITIES*/

            // Lets pretend that we have  a second entity "vehicle"
            //and we are going to relate it to our entity user
/*
            @Entity({ 
             name : "users"
             }) ==>>DECORATOR ==>> CREATES THE CLASS INTO AN ENTITY
             export class User {
                 @PrimaryGeneratedColumn() ==>  indicated that this is a primary id that will change overtime 
                 id:number

                 @Column({
                     length: 100 ===> indicates the length of the name  
                 }) ==>  Created the column
                 name:string

                 @Column() ==>  Created the column
                 email:string

                  @Column("integer") ==>  Created the column
                 age:number

                 @Column() ==>  Created the column
                active: boolean
                 @OneToOne(()=>vehicle) =>WE SPECIFY THAT OUR USER WILL HAVE A RELATION ONO TO TONE WITH VEHICLE
            }    @JoinColumn()
                 vehicle:vehicle ===> this is the column that states where the relation is at 
            */