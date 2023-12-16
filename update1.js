exports.update1 = async (event) => {
    const { Client } = require('pg');
    const idd = event.pathParameters.id;
    const value1= event.queryStringParameters.value1;
    const value2 = event.queryStringParameters.value2;
  
    const client = new Client({
      host: "localhost",
      port: "5433",
      user: "postgres",
      database: "naveed",
      password: "8310"
    });
  
    try {
      await client.connect();
      await client.query(`UPDATE customer SET order_details = jsonb_set(order_details, '{item}', $1::text::jsonb) WHERE id = $2`, [value1, idd]);
      await client.query(`UPDATE customer SET order_details = jsonb_set(order_details, '{qantity}', $1::text::jsonb) WHERE id = $2`, [value2, idd]);
      await client.end();
      return {
        statuscode: 200,
        body: JSON.stringify("Data updated successfully")
      };
    } catch (error) {
      return {
        statuscode: 500,
        body: JSON.stringify(error)
      };
    }
  };
  