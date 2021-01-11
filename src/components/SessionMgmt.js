var SessionMgmt = (function() {
    var username = "";
  
    var getUserName = function() {
      return username;    // Or pull this from cookie/localStorage
    };
  
    var setUserName = function(name) {
      username = name;     
      // Also set this in cookie/localStorage
    };
  
    return {
      getUserName: getUserName,
      setUserName: setUserName
    }
  
  })();
  
  export default SessionMgmt;