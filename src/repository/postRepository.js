const pool = require('../database');

class PostRepository {
    async findAll() {
        const posts = await pool.query('SELECT * FROM "Posts" ORDER BY date DESC');
        return posts.rows;
    }

    async create({ title, content }) {
        const posts = await pool.query('INSERT INTO "Posts" (title, content, date) VALUES ($1, $2, NOW()) RETURNING *',
            [title, content]
        );
        return posts.rows[0];
    }

    async deleteById({ id }) {
        const posts = await pool.query('DELETE FROM "Posts" WHERE id = $1 RETURNING *',[id]);
        return posts.rows;
    }
}

module.exports = new PostRepository();