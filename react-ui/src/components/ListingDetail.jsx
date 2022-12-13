import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { getListingById } from "../database/listing";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import Card from "@mui/material/Card";
import TestImage from "../assets/images/test.jpg";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { getHostStore } from "../database/settings";
import { sendListingToContacts } from "../comms";

function ListingDetail() {
  const params = useParams();
  const [listing, setListing] = useState();
  const [owner, setOwner] = useState(false);

  useEffect(() => {
    getListingById(params.id).then(function (result) {
      setListing(result);
    });
  }, [params.id]);


  useEffect(() => {
    if (listing) {
      getHostStore().then((host) => {
        if (listing.created_by_pk === host.host_store_pubkey) {
          setOwner(true);
        }
      });
    }
  }, [listing])

  return (
    <div>
      {listing ? (
        <Card sx={{ maxWidth: 345, marginTop: 2 }}>
          <CardMedia
            component="img"
            width="100%"
            image={TestImage}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              £{listing.price}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {listing.name}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            {owner ? null : <Button size="small">Buy Now</Button>}
            {owner ? null : <Button size="small">Contact Seller</Button>}
            <IconButton
              onClick={() => {
                sendListingToContacts(listing.listing_id);
              }}
              aria-label="share"
            >
              <ShareIcon />
            </IconButton>
          </CardActions>
          {owner ? null :
            <Tooltip title="Your mum" placement="bottom">
              <Button>Who sent me this?</Button>
            </Tooltip>
          }
        </Card>
      ) : null}
    </div>
  );
}
export default ListingDetail;
