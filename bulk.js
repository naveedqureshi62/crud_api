const fs = require('fs');

exports.bulk = async (event) => {
    try {
        const jsondata = fs.readFileSync(

            `C:\\Users\\Hi\\Desktop\\first_ezam\\naveed\\bulk.json`,          
            'utf-8'
        );

        const data = JSON.parse(jsondata);

        const { Client } = require('pg');

        const client = new Client({
            host: "localhost",
            port: 5433, 
            database: "naveed",
            user: "postgres",
            password: "8310"  
        });
 
        await client.connect();

        const insertPromises = data.map(record =>   {
            console.log(record);
            return client.query('INSERT INTO customer (order_details,customer_details) VALUES ($1::jsonb,$2::jsonb)',[record.order_details,record.customer_details]);
        });

        await Promise.all(insertPromises);
        await client.end();

        return {
            stetusCode:200,
            body:JSON.stringify(data)
        };
        
    } catch (error) {
        console.error(error);
        throw error; // Removed the extra space before "throw"
    }
};