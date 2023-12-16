exports.search = async(event) => {
    const { Client} = require('pg');
    const client = new Client({
        host: "localhost",
        port: "5433",
        user: "postgres",
        database: "naveed",
        password: "8310" 
    });

    try{
       await client.connect();
    const result= await client.query(`select * from customer`);
       await client.end();

       return{
           statuscode:200,
           body:JSON.stringify(result.rows)
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