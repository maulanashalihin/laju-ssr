import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('comments', function (table) {
        table.string('id').primary().notNullable()
        table.string("author_id").index();
        table.string("author_name");
        table.string("message"); 
        table.integer("likes").defaultTo(0); 
        table.string("post_id").index();
        table.string("comment_id").index();
        /**
         * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
         */
        table.bigInteger("created_at")
        table.bigInteger("updated_at")
      
    }) 
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('comments')
}

