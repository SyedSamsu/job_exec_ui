/* eslint-disable array-callback-return */
import {
  Box,
  Button,
  Container,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const EventJob = (props) => {
  const [addEvent, setAddEvent] = useState(false);
  const [createMsg, setCreateMsg] = useState("");
  const [eventjob, setEventjob] = useState({
    jobName: "",
    jobDetails: "",
    jobEvent: "",
  });
  const [events, setEvents] = useState([]);
  const [eventJobs, setEventJobs] = useState([]);
  const [eventTable, setEventTable] = useState(false);
  const [jobStatusFTL, setJobStatusFLT] = useState("");
  const getEvents = async () => {
    const result = await axios.get(
      `http://localhost:9090/eventjobexecutor/v1/getallevents`
    );
    setEvents(result.data);
  };
  const getAllEventJobs = async () => {
    const result = await axios.get(
      `http://localhost:9090/eventjobexecutor/v1/getalleventjob`
    );
    setEventJobs(result.data);
  };
  const submitAddEventJob = async () => {
    const result = await axios.post(
      `http://localhost:9090/eventjobexecutor/v1/createeventjob`,
      eventjob
    );
    if (result.status === 200) {
      setCreateMsg(eventjob.jobName + " Event Job Created Successfully ");
      setEventjob({
        jobName: "",
        jobDetails: "",
        jobEvent: " ",
      });
    }
    setAddEvent(false);
  };
  const executeEventJob = async (id) => {
    const result = await axios.put(
      `http://localhost:9090/eventjobexecutor/v1/runeventjob/${id}`
    );
    if(result.status === 200){
      getAllEventJobs();
    }
  }

  useEffect(() => {
    getEvents();
    getAllEventJobs();
  }, []);
  const filterJobStatus = () => {
    const filterdata = eventJobs.filter((timeJb) =>
      (timeJb.jobCurrentStatus === null
        ? "CREATED"
        : timeJb.jobCurrentStatus) === jobStatusFTL
    );
    setEventJobs(filterdata);
  };
  return (
    <>
      {props.role === "admin" ? (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                paddingY: 2, // set top and bottom padding
              }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  setAddEvent(true);
                  setCreateMsg("");
                  setEventTable(false);
                }}
              >
                Add Event Job
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                paddingY: 2, // set top and bottom padding
              }}
            >
              <Button
                variant="contained"
                onClick={() => {
                  setAddEvent(false);
                  setCreateMsg("");
                  setEventTable(true);
                  getAllEventJobs();
                }}
              >
                Show Event Jobs Table
              </Button>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            paddingY: 2, // set top and bottom padding
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              setAddEvent(false);
              setCreateMsg("");
              setEventTable(true);
              getAllEventJobs();
            }}
          >
            Show Event Jobs Table
          </Button>
        </Box>
      )}

      {eventTable && (
        <Container fixed>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 4,
                  paddingBottom: 4,
                }}
              >
                <Typography
                  component="h2"
                  variant="h6"
                  color="primary"
                  gutterBottom
                  sx={{ marginRight: 2 }}
                >
                  Event Jobs Table
                </Typography>
                <Button variant="contained" color="primary" sx={{ marginLeft: 2 }} onClick={getAllEventJobs}>
                  Refresh
                </Button>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 4,
                  paddingBottom: 4,
                }}
              >
                <TextField
                  required
                  id="jobName"
                  name="jobName"
                  label="Job Current Status Filter"
                  autoWidth
                  variant="standard"
                  value={jobStatusFTL}
                  onChange={(e) => {
                    setJobStatusFLT(e.target.value);
                    getAllEventJobs();
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ marginLeft: 2 }}
                  onClick={filterJobStatus}
                >
                  Filter
                </Button>
              </Box>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Id</TableCell>
                    <TableCell align="center">Job Name</TableCell>
                    <TableCell align="center">Job Details</TableCell>
                    <TableCell align="center">Job Event</TableCell>
                    <TableCell align="center">Job Exec Count </TableCell>
                    <TableCell align="center">Job Current Status </TableCell>
                    <TableCell align="center">Execute</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {eventJobs &&
                    eventJobs.map((event) => (
                      <TableRow key={event.id}>
                        <TableCell align="center">{event.id}</TableCell>
                        <TableCell align="center"s>{event.jobName}</TableCell>
                        <TableCell align="center">{event.jobDetails}</TableCell>
                        <TableCell align="center">{event.jobEvent}</TableCell>
                        <TableCell align="center">{event.jobExecCount}</TableCell>
                        <TableCell align="center">
                          {event.jobCurrentStatus === null
                            ? "CREATED"
                            : event.jobCurrentStatus}
                        </TableCell>
                        <TableCell align="center">
                          <Button variant="contained" onClick={() => {executeEventJob(event.id);}}>START</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Container>
      )}

      {addEvent && (
        <Container fixed>
          <Typography variant="h6" gutterBottom>
            Event Job Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="jobName"
                name="jobName"
                label="Job Name"
                fullWidth
                variant="standard"
                value={eventjob.jobName}
                onChange={(e) =>
                  setEventjob({ ...eventjob, jobName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="jobDetail"
                name="jobDetail"
                label="Job Detail"
                fullWidth
                variant="standard"
                value={eventjob.jobDetails}
                onChange={(e) =>
                  setEventjob({ ...eventjob, jobDetails: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="jobEvent">Job Event</InputLabel>
              <Select
                labelId="jobEvent"
                id="jobEvent"
                fullWidth
                label="Job Event"
                value={eventjob.jobEvent}
                onChange={(e) =>
                  setEventjob({ ...eventjob, jobEvent: e.target.value })
                }
              >
                <MenuItem value={" "}>Select the Job Event</MenuItem>
                {events &&
                  events.map((eventname) => {
                    return (
                      <MenuItem key={eventname} value={eventname}>
                        {eventname}
                      </MenuItem>
                    );
                  })}
              </Select>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                paddingY: 2, // set top and bottom padding
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={submitAddEventJob}
              >
                Submit Event Job
              </Button>
            </Grid>
          </Grid>
        </Container>
      )}
      {!addEvent && (
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            paddingY: 2, // set top and bottom padding
          }}
        >
          <Typography variant="h6" gutterBottom>
            {createMsg}
          </Typography>
        </Grid>
      )}
    </>
  );
};
