let headerBarContext;
let homeContext;
let userContext;

const commonService = {

    getHeaderBarContext: function(){
        return headerBarContext;
    },

    setHeaderBarContext: function(context){
        headerBarContext = context
    },

    getHomeContext: function(){
        return homeContext;
    },

    setHomeContext: function(context){
        homeContext = context
    },

    getUserContext: function(){
        return userContext;
    },

    setUserContext: function(context){
        userContext = context
    }

}

export default commonService;