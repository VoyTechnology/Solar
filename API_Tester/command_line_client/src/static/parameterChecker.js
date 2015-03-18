// this static class is made to check parameters for each request handler

var parameterChecker = {

    newSock : function(parameters) {
        if (parameters.length == 1) {
            if(typeof parameters[0] == "string") {
                if ( parameters[0].length > 0) {
                    return true;
                }
            }
        }
        return false;
    },

    delSock : function(parameters) {
        if (parameters.length == 1) {
            if(typeof parameters[0] == "string") {
                if ( parameters[0].length > 0) {
                    return true;
                }
            }
        }
        if ( parameters.length === 0) {
            return true;
        }
        return false;
    },

    closeSock : function(parameters) {
        if (parameters.length == 1) {
            if(typeof parameters[0] == "string") {
                if ( parameters[0].length > 0) {
                    return true;
                }
            }
        }
        if ( parameters.length === 0) {
            return true;
        }
        return false;
    },

    openSock : function(parameters) {
        if (parameters.length == 1) {
            if(typeof parameters[0] == "string") {
                if ( parameters[0].length > 0) {
                    return true;
                }
            }
        }
        if ( parameters.length === 0) {
            return true;
        }
        return false;
    },

    emit : function(parameters) {
        if (parameters.length == 1) {
            if(typeof parameters[0] == "string") {
                if ( parameters[0].length > 0) {
                    return true;
                }
            }
        }
        if (parameters.length == 2) {
            if(typeof parameters[1] == "string") {
                if ( parameters[1] > 0) {
                    return true;
                }
            }
        }
        return false;
    },

    listSocks : function(parameters) {
        if (parameters.length === 0) {
            return true;
        }
        return false;
    },

    startStress : function(parameters) {
        if (parameters.length == 1) {
            var num;

            try {
                num = parseInt(parameters[0]);
            }
            catch (err) {
                return false;
            }

            return true;
        }
    },

    stopStress : function(parameters) {
        if (parameters.length === 0) {
            return true;
        }
        return false;
    },

    useSock : function(parameters) {
        if (parameters.length == 1) {
            if(typeof parameters[0] == "string") {
                if (parameters[0].length > 0) {
                    return true;
                }
            }
        }
        return false;
    },

    showLog : function(parameters) {
        if (parameters.length == 1) {
            if(typeof parameters[0] == "string") {
                if ( parameters[0].length > 0) {
                    return true;
                }
            }
        }
        if ( parameters.length === 0) {
            return true;
        }
        return false;
    },

    leaveSock : function(parameters) {
        if(parameters.length === 0) {
            return true;
        }
        return false;
    }
};

module.exports = parameterChecker;
