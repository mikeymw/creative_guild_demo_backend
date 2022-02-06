const connectDatabase = async (srv, database) => {
    console.log(`${new Date().toISOString()} - Connecting to database: ${database}`);

    try {
        // do your database connection here
    } catch (e) {
        console.error(`${new Date().toISOString()} - Error connecting database: ${database}`);
    }

    console.log(`${new Date().toISOString()} - Connection to database: ${database} established`);
}

export default connectDatabase;