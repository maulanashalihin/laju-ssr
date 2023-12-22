import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('portals', function (table) {
        table.string('id').primary().notNullable()
   
        table.string('name')  
        table.text('url') 
        /**
         * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
         */
      
        table.bigInteger("created_at")
        table.bigInteger("updated_at")
      
    }) 
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('portals')
}

