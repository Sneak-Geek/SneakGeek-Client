
import React from 'react';
import { Route, Switch } from "react-router";
import { SupportTicketTable } from "./Components";
import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(4),
    },
  }));


const SupportTicketScreen = (): JSX.Element => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Switch>
                <Route exact path={'/support-tickets'} component={SupportTicketTable}/>
            </Switch>
        </div>
    );
}

export default SupportTicketScreen;