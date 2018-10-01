import React from 'react';
import PropTypes from 'prop-types';

import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { SigninLink } from 'containers/SigninPage/SigninPage';
import UserMenu from './UserMenu';

const styles = theme => ({
    root: {
        width: '100%',
    },
    bar: {
        boxShadow: 'none',
    },
    grow: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade('#EDE7F6', .15),
        '&:hover': {
            backgroundColor: fade('#EDE7F6', 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
});

class TopBar extends React.Component {

    handleSubmit = event => {
        event.preventDefault();
        this.props.submitSearch();
    }

    render() {
        const { classes, changeSearch, signout, user } = this.props;

        const renderSearchBar = (
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <form onSubmit={this.handleSubmit}>
                    <Input
                        onChange={changeSearch}
                        placeholder="Search…"
                        disableUnderline
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                    />
                </form>
            </div>
        );

        return (
            <div className={classes.root}>
                <AppBar position="static" color="inherit" className={classes.bar}>
                    <Toolbar>
                        <Typography className={classes.title} variant="title" color="inherit" noWrap>
                            PTrade
                        </Typography>
                        {renderSearchBar}
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            {user.isAuthenticated ?
                                <UserMenu signout={signout} />
                                :
                                <Button component={SigninLink} color='inherit' >
                                    <Typography variant="subheading" color="inherit">Sign in</Typography>
                                </Button>
                            }
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

TopBar.propTypes = {
    classes: PropTypes.object.isRequired,
    submitSearch: PropTypes.func.isRequired,
    changeSearch: PropTypes.func.isRequired,
    signout: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopBar);