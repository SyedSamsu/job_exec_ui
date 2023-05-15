import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { EventJob } from "../EventJob/EventJob";
import { TimeJob } from "../TimeJob/TimeJob";

const HomeComponent = (props) => {

  const [enabletime, setEnableTime] = useState(false);

  return (
    <>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 4,
        paddingBottom: 4,
      }}
    >
      <Button variant="contained" color="primary" sx={{ marginRight: 2 }} onClick={() => setEnableTime(false)}>Event Job</Button>
      <Button variant="contained" color="secondary" sx={{ marginLeft: 2 }} onClick={() => setEnableTime(true)}>Time Job</Button>

    </Box>
      { !enabletime && <EventJob {...props}/>}
      { enabletime && <TimeJob  {...props}/>}
    </>
  );
};

export default HomeComponent;
