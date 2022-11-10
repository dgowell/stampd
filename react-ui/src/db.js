/* adds a listing to the database */
export function createListing(name, price, listingCallback) {
    let fullsql = `INSERT INTO listings (name,price) VALUES ('${name}','${price}')`;
    console.log(`name: ${name}, price: ${price}`);
    window.MDS.sql(fullsql, (res) => {
        if (res.status){
            listingCallback(null, true);
        } else {
           listingCallback(res, null);
        }
    });
}

/* retrieves all listings */
export function getAllListings(allListingsCallback) {
    window.MDS.sql(`SELECT name, price FROM listings;`, (res) =>{
        if (res.status) {
            allListingsCallback(null, res.rows);
        } else {
            allListingsCallback(res, null);
        }
    });
}

export function getListingById(id, data) {
    window.MDS.sql(`SELECT * FROM listings WHERE id = ${id}`, function (sqlmsg) {
        if (sqlmsg) {
            data(sqlmsg.rows);
        }
    });
}