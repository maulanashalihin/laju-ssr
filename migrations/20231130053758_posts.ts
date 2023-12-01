import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('posts', function (table) {
        table.string('id').primary().notNullable()
        table.string("slug").unique();
        table.string("category").index();
        table.string('title')  
        table.text('content')
        table.string("thumbnail");
        table.string("thumbnail_title");
        table.string("thumbnail_description");
        table.string("author_id").index();
        table.string("author_name");
        table.integer("views").defaultTo(0);
        table.integer("likes").defaultTo(0);
        table.integer("comments").defaultTo(0);
        table.integer("shares").defaultTo(0);
        table.integer("read_time").defaultTo(1);
        table.integer("word_count").defaultTo(0);
        table.integer("char_count").defaultTo(0);
        table.integer("bookmarks").defaultTo(0);
        table.integer("replies").defaultTo(0);
        table.integer("reports").defaultTo(0);
        table.string("status").defaultTo("draft").index();  
        /**
         * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
         */
        table.bigInteger("published_at")
        table.bigInteger("created_at")
        table.bigInteger("updated_at")
      
    }) 
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('posts')
}

