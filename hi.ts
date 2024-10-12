// import { DataSource, QueryRunner, Repository } from "typeorm";

// import { User } from "./src/user/entities/user.entity";

// const dataSource = new DataSource({
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'test',
//   password: 'test',
//   entities: [User, Photo],
//   synchronize: true,
//   logging: false
// });

// const queryRunner = dataSource.createQueryRunner()

// async function transaction() {
//   await queryRunner.connect()
  
//   await queryRunner.query("SELECT * FROM users")
  
//   const users = await queryRunner.manager.find(User)
  
//   await queryRunner.startTransaction('READ COMMITTED')
//   await queryRunner.startTransaction('READ UNCOMMITTED')
//   await queryRunner.startTransaction('REPEATABLE READ')
//   await queryRunner.startTransaction('SERIALIZABLE')
  
//   try {
//       await queryRunner.manager.save(user1)
//       await queryRunner.manager.save(user2)
//       await queryRunner.manager.save(photos)
  
//       await queryRunner.commitTransaction()
//   } catch (err) {
//       await queryRunner.rollbackTransaction()
//   } finally {
//       await queryRunner.release()
//   }

// }


// async function startTransaction() {
//   const queryRunner = dataSource.createQueryRunner();

//   await queryRunner.connect();
//   await queryRunner.startTransaction();

//   return queryRunner;
// }

// async function commitTransaction(queryRunner: QueryRunner) {
//   await queryRunner.commitTransaction();
//   await queryRunner.release();
// }

// async function rollbackTransaction(queryRunner: QueryRunner) {
//   await queryRunner.rollbackTransaction();
//   await queryRunner.release();
// }

// class UserRepository extends Repository<User> {
//   constructor(private dataSource: DataSource) {
//     super(User, dataSource.createEntityManager());
//   }

//   async saveUser(user: User, queryRunner?: QueryRunner) {
//     if (!queryRunner) {
//       queryRunner = this.dataSource.createQueryRunner();
//     }

//     return await queryRunner.manager.save(user);
//   }
// }

// class HeroRepository extends Repository<Hero> {
//   constructor(private dataSource: DataSource) {
//     super(Hero, dataSource.createEntityManager());
//   }

//   async saveHero(hero: Hero, queryRunner?: QueryRunner) {
//     if (!queryRunner) {
//       queryRunner = this.dataSource.createQueryRunner();
//     }

//     return await queryRunner.manager.save(hero);
//   }
// }

// class HeroService {
//   constructor(private heroRepository: HeroRepository) {}

//   async saveHero(hero: Hero, queryRunner?: QueryRunner) {
//     return await this.heroRepository.saveHero(hero, queryRunner);
//   }
// }

// async function registerUser(user: User) {
//   const userRepository = new UserRepository(dataSource);
//   const heroRepository = new HeroRepository(dataSource);
//   const heroService = new HeroService(heroRepository);

//   const queryRunner = await startTransaction();

//   try {
//     await userRepository.saveUser(user, queryRunner);
//     await heroService.saveHero(user.hero, queryRunner);
//   } catch (error) {
//     await commitTransaction(queryRunner);
//   } finally {
//     await rollbackTransaction(queryRunner);
//   }
// }
