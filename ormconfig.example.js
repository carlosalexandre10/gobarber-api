module.exports = [
  {
    type: "postgres",
    port: 5432,
    host: "localhost",
    username: "postgres",
    password: "docker",
    database: "gobarber",
    migrations: ["./src/shared/database/migrations/*.ts"],
    entities: ["./src/modules/**/entities/*.ts"],
    cli: {
      migrationsDir: "./src/shared/database/migrations"
    }
  }
]