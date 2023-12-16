exports.insert = async(event) => {
    const { Client} = require('pg');
    const body = JSON.parse(event.body);
    const client = new Client({
        host: "localhost",
        port: "5433",
        user: "postgres",
        database: "naveed",
        password: "8310" 
    });

    try{
       await client.connect();
       await client.query('insert into customer (order_details,customer_details) values ($1::jsonb,$2::jsonb)',[body.order_details,body.customer_details]);
       await client.end();

       return{
           statuscode:200,
           body:JSON.stringify(`data inserted sucessfully`)
       };
    } 
    catch(error)
    {
        return{
            statuscode:500,
            body:JSON.stringify(error)
        };
    }

};