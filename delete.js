exports.delete = async (event) => {
   
    const value = event.queryStringParameters.id
    const { Client } = require('pg');

    const client = new Client({
        host: "localhost",
        port: "5433",
        user: "postgres",
        database: "naveed",
        password: "8310"
    });

    client.connect();
  console.log(value);

    try {
        await client.query('DELETE FROM customer where id = $1',[value]);
          client.end();
          
            return {
                "statusCode": 200,"body": JSON.stringify("data deleted sucessfully")
            };

         } catch(error) {
       
        return { "statusCode": 500,"body": JSON.stringify(error)
        }
    }
};