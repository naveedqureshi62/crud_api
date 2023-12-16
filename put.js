const { Client } = require('pg');

exports.put = async (event) => {
  const { Client } = require('pg');
  const bdy = JSON.parse(event.body);
  console.log(bdy);
  const client = new Client({
    host: "localhost",
    port: "5433",
    user: "postgres",
    database: "naveed",
    password: "4414"
  });

  try {
    await client.connect();

    const updateQuery = ('UPDATE customer SET order_details = $1::jsonb WHERE id = $2');
    const values = [bdy.customer_details, bdy.id];

    await client.query(updateQuery, values);
    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify("Updated successfully")
    };
  } catch (error) {
    console.error("Error", error);
    await client.end();

    return {
      statusCode: 500,
      body: JSON.stringify("Error")
  };
 }
};