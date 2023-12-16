exports.update = async(event) => {
    const { Client} = require('pg');
    const idd = event.pathParameters.id;
    const value = event.queryStringParameters.value;

    const client = new Client({
        host: "localhost",
        port: "5433",
        user: "postgres",
        database: "naveed",
        password: "8310" 
    });

    try{
       await client.connect();
        await client.query(`update customer set customer_details=jsonb_set(order_details,'{item}','{qantity}', ($1::text)::jsonb) where id=$2`,[value,idd]);
       await client.end();

       return{
           statuscode:200,
           body:JSON.stringify("data updated successfuly")
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