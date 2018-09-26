import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import TradeModal from './TradeModal';

const styles = theme => ({
    containerButton: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        paddingTop: theme.spacing.unit * 4
    },
    containerTable: {
        width: '100%',
    },
    paper: {
        height: '100%',
        width: '100%',
        marginTop: theme.spacing.unit,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
    },
    table: {
        width: '100%',
        overflowX: 'auto',
    },
});

let id = 0;
function createData(name, value) {
    id += 1;
    return { id, name, value };
}

const data = (quote) => [
    createData('OPEN', quote['open'] ? quote['open'] : 'N/A'),
    createData('CLOSE', quote['close'] ? quote['close'] : 'N/A'),
    createData('HIGH', quote['high'] ? quote['high'] : 'N/A'),
    createData('LOW', quote['low'] ? quote['low'] : 'N/A'),
    createData('52 WK HIGH', quote['week52High'] ? quote['week52High'] : 'N/A'),
    createData('52 WK LOW', quote['week52Low'] ? quote['week52Low'] : 'N/A'),
    createData('AVG VOL', quote['avgTotalVolume'] ? quote['avgTotalVolume'] : 'N/A'),
    createData('MKT CAP', quote['marketCap'] ? quote['marketCap'] : 'N/A'),
];

const InfoTable = ({ classes, changeTradeQuantity, submitTrade, quote, user }) => (
    <Paper className={classes.paper} elevation={1}>
        <Typography variant="title" gutterBottom>{quote['name'] ? quote['name'] : 'N/A'}</Typography>
        <div className={classes.containerTable}>
            <Table className={classes.table}>
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell>{quote['symbol'] ? quote['symbol'] : 'N/A'}</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className={classes.tableBody}>
                    {data(quote).map(n => {
                        return (
                            <TableRow key={n.id} className={classes.tableRow}>
                                <TableCell component="th" scope="row" variant="head">
                                    {n.name}
                                </TableCell>
                                <TableCell component="td" scope="row" numeric>{n.value}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
            <div className={classes.containerButton}>
                <TradeModal
                    title="Buy"
                    disabled={!user.isAuthenticated}
                    symbol={quote['symbol']}
                    handleTrade={submitTrade}
                    handleChange={changeTradeQuantity}
                />
                <TradeModal
                    title="Sell"
                    disabled={!user.isAuthenticated}
                    symbol={quote['symbol']}
                    handleTrade={submitTrade}
                    handleChange={changeTradeQuantity}
                />
            </div>
        </div>
    </Paper>
);

InfoTable.propTypes = {
    classes: PropTypes.object.isRequired,
    submitTrade: PropTypes.func.isRequired,
    changeTradeQuantity: PropTypes.func.isRequired,
    quote: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfoTable);


