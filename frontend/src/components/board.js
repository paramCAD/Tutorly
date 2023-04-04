/*
Author: Parampal Singh
*/
import Grid from "@mui/material/Grid";
import React from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Filter1Icon from "@mui/icons-material/Filter1";
import Filter2Icon from "@mui/icons-material/Filter2";
import Filter3Icon from "@mui/icons-material/Filter3";
import Filter4Icon from "@mui/icons-material/Filter4";
import Filter5Icon from "@mui/icons-material/Filter5";
import ButtonBase from "@mui/material/ButtonBase";
import StarsIcon from '@mui/icons-material/Stars';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Board() {

  const [leaderboard, setLeaderboard] = React.useState([]);
  const rootDomain = process.env.REACT_APP_BACKEND_BASE_URL;

  const courseId = useParams().id;

  const getLeaderboard = async () => {
    const response = await axios({
      method: "GET",
      url: `${rootDomain}/course/${courseId}/leaderboard`,
      headers: {
        "Content-Type": "application/json",
      },
    });
    sort(response.data.data);
    setLeaderboard(response.data.data);
  };

  React.useEffect(() => {
    getLeaderboard();
  }, []);

  return (
    <>
      <Grid item container alignItems="center" justifyContent="center" >
        <div style={{ width: '100%' }}>
          <Paper
            sx={{
              p: 2
            }}>
            <Typography variant="h5" align="center" sx={{ fontWeight: 'bold', fontStyle: 'italic' }}><StarsIcon color="primary" /> LEADERBOARD <StarsIcon color="primary" /></Typography>
            {leaderboard.map((value, index) => (
              <Paper
                sx={{
                  p: 2,
                  margin: "auto",
                  maxWidth: "100%",
                  flexGrow: 1,
                  m: 2,
                  bgcolor: "primary.main",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item>
                    <ButtonBase sx={{ width: 50, height: 50 }}>
                      <AccountCircleIcon fontSize="large" />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography gutterBottom variant="subtitle1" component="div">
                          <b>Name: </b>{value.name}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                          <b>Score -</b> {value.score}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" align="right">
                          {index === 0 && <Filter1Icon />}
                          {index === 1 && <Filter2Icon />}
                          {index === 2 && <Filter3Icon />}
                          {index === 3 && <Filter4Icon />}
                          {index === 4 && <Filter5Icon />}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Paper>
        </div>
      </Grid>
    </>
  );
}

function sort(data) {
  return data.sort((a, b) => {
    if (a.score === b.score) {
      return b.score - a.score;
    } else {
      return b.score - a.score;
    }
  });
}
