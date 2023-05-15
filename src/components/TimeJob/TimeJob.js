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
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns-tz";

export const TimeJob = (props) => {
  const [addTime, setAddTime] = useState(false);
  const [createMsg, setCreateMsg] = useState("");
  const [timejob, setTimejob] = useState({
    jobName: "",
    jobDetails: "",
    jobKey: "",
    jobTime: "",
    jobRecurr: false,
  });
  const [timeJobKey, setTimeJobKey] = useState([]);
  const [timeJobs, setTimeJobs] = useState([]);
  const [timeTable, setTimeTable] = useState(false);
  const [updateTimeJob, setUpdateTimeJob] = useState({
    id: 0,
    jobName: "",
    jobDetails: "",
    jobKey: "",
    jobTime: "",
    jobExecTime: "",
    jobRecurr: false,
    jobExecCount: 0,
    jobCurrentStatus: "",
  });
  const [updateForm, setUpdateForm] = useState(false);
  const [jobStatusFTL, setJobStatusFLT] = useState("");
  const getTimeJobKeys = async () => {
    const result = await axios.get(
      `http://localhost:9090/timejobexecutor/v1/getalltimejobskey`
    );
    setTimeJobKey(result.data);
  };

  const submitAddTimeJob = async () => {
    const result = await axios.post(
      `http://localhost:9090/timejobexecutor/v1/createtimejob`,
      timejob
    );
    if (result.status === 200) {
      setCreateMsg(timejob.jobName + " Event Job Created Successfully ");
      setTimejob({});
    }
    setAddTime(false);
  };
  const sumitUpdateTImeJob = async () => {
    const result = await axios.put(
      `http://localhost:9090/timejobexecutor/v1/updatetimejob`,
      updateTimeJob
    );
    if (result.status === 200) {
      setCreateMsg(timejob.jobName + " Event Job Updated Successfully ");
      setUpdateTimeJob({
        id: 0,
        jobName: "",
        jobDetails: "",
        jobKey: "",
        jobTime: "",
        jobExecTime: "",
        jobRecurr: false,
        jobExecCount: 0,
        jobCurrentStatus: "",
      });
      getAllTimeJobs();
    }
  };
  const getAllTimeJobs = async () => {
    const result = await axios.get(
      `http://localhost:9090/timejobexecutor/v1/getalltimejob`
    );
    setTimeJobs(result.data);
  };
  const executeTimeJob = async (id) => {
    const result = await axios.get(
      `http://localhost:9090/timejobexecutor/v1/runtimejob/${id}`
    );
    if (result.status === 200) {
      getAllTimeJobs();
    }
  };
  const stopTimeJob = async (id) => {
    const result = await axios.get(
      `http://localhost:9090/timejobexecutor/v1/stoptimejob/${id}`
    );
    if (result.status === 200) {
      getAllTimeJobs();
    }
  };
  useEffect(() => {
    getTimeJobKeys();
    getAllTimeJobs();
  }, [timejob]);
  const toIndianTimeZone = (date) => {
    return format(date, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", {
      timeZone: "Asia/Kolkata",
    }).split("+")[0];
  };
  const formatStringToDate = (stringDate) => {
    const date = new Date(stringDate);
    const formattedDateString = date.toLocaleString("en-IN");
    return formattedDateString;
  };
  const checkStartDisable = (status) => {
    if (
      status === "SCHEDULED" ||
      status === "COMPLETED" ||
      status === "RUNNING"
    ) {
      return true;
    }
    return false;
  };
  const checkStopDisable = (status) => {
    if (status === "STOPPED") {
      return true;
    }
    return false;
  };
  const filterJobStatus = () => {
    const filterdata = timeJobs.filter((timeJb) =>
      (timeJb.jobCurrentStatus === null
        ? "CREATED"
        : timeJb.jobCurrentStatus) === jobStatusFTL
    );
    setTimeJobs(filterdata);
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
                color="secondary"
                onClick={() => {
                  setAddTime(true);
                  setCreateMsg("");
                  setTimeTable(false);
                }}
              >
                Add Time Job
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
                color="secondary"
                onClick={() => {
                  setAddTime(false);
                  setCreateMsg("");
                  setTimeTable(true);
                  getAllTimeJobs();
                }}
              >
                Show Time Jobs Table
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
            color="secondary"
            onClick={() => {
              setAddTime(false);
              setCreateMsg("");
              setTimeTable(true);
              getAllTimeJobs();
            }}
          >
            Show Time Jobs Table
          </Button>
        </Box>
      )}

      {timeTable && (
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
                  color="secondary"
                  gutterBottom
                  sx={{ marginRight: 2 }}
                >
                  Time Jobs Table
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ marginLeft: 2 }}
                  onClick={getAllTimeJobs}
                >
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
                    getAllTimeJobs();
                  }}
                />
                <Button
                  variant="contained"
                  color="secondary"
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
                    <TableCell align="center">Job Key</TableCell>
                    <TableCell align="center">Job Time</TableCell>
                    <TableCell align="center">Job Exec Count </TableCell>
                    <TableCell align="center">Job Recurr </TableCell>
                    <TableCell align="center">Job Exec Time</TableCell>
                    <TableCell align="center">Job Current Status </TableCell>
                    <TableCell align="center">Update Execute</TableCell>
                    <TableCell align="center">Start Execute</TableCell>
                    <TableCell align="center">Stop Execute</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {timeJobs &&
                    timeJobs.map((time) => (
                      <TableRow key={time.id}>
                        <TableCell align="center">{time.id}</TableCell>
                        <TableCell align="center">{time.jobName}</TableCell>
                        <TableCell align="center">{time.jobDetails}</TableCell>
                        <TableCell align="center">{time.jobKey}</TableCell>
                        <TableCell align="center">
                          {formatStringToDate(time.jobTime)}
                        </TableCell>
                        <TableCell align="center">
                          {time.jobExecCount}
                        </TableCell>
                        <TableCell align="center">
                          {time.jobRecurr === true ? "True" : "False"}
                        </TableCell>
                        <TableCell align="center">
                          {JSON.stringify(time.jobExecTime) === "null"
                            ? "Not Executed"
                            : formatStringToDate(time.jobExecTime)}
                        </TableCell>
                        <TableCell align="center">
                          {time.jobCurrentStatus === null
                            ? "CREATED"
                            : time.jobCurrentStatus}
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            color="info"
                            variant="contained"
                            onClick={() => {
                              setUpdateTimeJob(time);
                              setUpdateForm(true);
                            }}
                          >
                            UPDATE
                          </Button>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            color="secondary"
                            disabled={checkStartDisable(time.jobCurrentStatus)}
                            variant="contained"
                            onClick={() => {
                              executeTimeJob(time.id);
                            }}
                          >
                            START
                          </Button>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            color="error"
                            disabled={checkStopDisable(time.jobCurrentStatus)}
                            variant="contained"
                            onClick={() => {
                              stopTimeJob(time.id);
                            }}
                          >
                            STOP
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        </Container>
      )}

      {updateForm && (
        <Container fixed>
          <Typography variant="h6" gutterBottom>
            Update Time Job Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="jobName"
                name="jobName"
                label="Job Name"
                fullWidth
                disabled
                variant="standard"
                value={updateTimeJob.jobName || ""}
                onChange={(e) =>
                  setUpdateTimeJob({
                    ...updateTimeJob,
                    jobName: e.target.value,
                  })
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
                disabled
                variant="standard"
                value={updateTimeJob.jobDetails || ""}
                onChange={(e) =>
                  setUpdateTimeJob({
                    ...updateTimeJob,
                    jobDetails: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputLabel id="jobKey" required>
                Job Key
              </InputLabel>
              <Select
                labelId="jobKey"
                id="jobKey"
                fullWidth
                disabled
                label="Job Key"
                value={updateTimeJob.jobKey || ""}
                onChange={(e) =>
                  setUpdateTimeJob({ ...updateTimeJob, jobKey: e.target.value })
                }
              >
                {timeJobKey &&
                  timeJobKey.map((eventname) => {
                    return (
                      <MenuItem key={eventname} value={eventname}>
                        {eventname}
                      </MenuItem>
                    );
                  })}
              </Select>
            </Grid>
            <Grid item xs={12} sm={3}>
              <InputLabel id="jobTime" required>
                Job Time
              </InputLabel>
              <LocalizationProvider
                labelId="jobTime"
                id="jobTime"
                dateAdapter={AdapterDateFns}
                locale={"en-IN"}
              >
                <DateTimePicker
                  onChange={(newValue) =>
                    setUpdateTimeJob({
                      ...updateTimeJob,
                      jobTime: toIndianTimeZone(newValue),
                    })
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={5}>
              <InputLabel id="jobRecurr" required>
                Job Recurr
              </InputLabel>
              <Select
                labelId="jobRecurr"
                id="jobRecurr"
                fullWidth
                label="Job Recurr"
                value={updateTimeJob.jobRecurr || "False"}
                onChange={(e) =>
                  setUpdateTimeJob({
                    ...updateTimeJob,
                    jobRecurr: e.target.value,
                  })
                }
              >
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: 4,
                  paddingBottom: 4,
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={sumitUpdateTImeJob}
                  sx={{ marginRight: 2 }}
                >
                  Uppdate Time Job
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setUpdateForm(false);
                    setCreateMsg("");
                  }}
                  sx={{ marginRight: 2 }}
                >
                  Close
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      )}

      {addTime && (
        <Container fixed>
          <Typography variant="h6" gutterBottom>
            Time Job Details
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
                value={timejob.jobName}
                onChange={(e) =>
                  setTimejob({ ...timejob, jobName: e.target.value })
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
                value={timejob.jobDetails}
                onChange={(e) =>
                  setTimejob({ ...timejob, jobDetails: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputLabel id="jobKey" required>
                Job Key
              </InputLabel>
              <Select
                labelId="jobKey"
                id="jobKey"
                fullWidth
                label="Job Key"
                value={timejob.jobKey}
                onChange={(e) =>
                  setTimejob({ ...timejob, jobKey: e.target.value })
                }
              >
                {timeJobKey &&
                  timeJobKey.map((eventname) => {
                    return (
                      <MenuItem key={eventname} value={eventname}>
                        {eventname}
                      </MenuItem>
                    );
                  })}
              </Select>
            </Grid>
            <Grid item xs={12} sm={3}>
              <InputLabel id="jobTime" required>
                Job Time
              </InputLabel>
              <LocalizationProvider
                labelId="jobTime"
                id="jobTime"
                dateAdapter={AdapterDateFns}
                locale={"en-IN"}
              >
                <DateTimePicker
                  onChange={(newValue) =>
                    setTimejob({
                      ...timejob,
                      jobTime: toIndianTimeZone(newValue),
                    })
                  }
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={5}>
              <InputLabel id="jobRecurr" required>
                Job Recurr
              </InputLabel>
              <Select
                labelId="jobRecurr"
                id="jobRecurr"
                fullWidth
                label="Job Recurr"
                value={timejob.jobRecurr}
                onChange={(e) =>
                  setTimejob({ ...timejob, jobRecurr: e.target.value })
                }
              >
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
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
                color="secondary"
                onClick={submitAddTimeJob}
              >
                Submit Time Job
              </Button>
            </Grid>
          </Grid>
        </Container>
      )}
      {!addTime && (
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
