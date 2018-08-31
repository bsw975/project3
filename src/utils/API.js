import axio from 'axios';

export default {
    //No matching backend routes yet. 
    //Brad, you said you are doing the backend part that query the db?
    loadUserInfo: function(id){
        return axio.get("/api/users/"+id)
    },

    loadUsers: function(){
        return axio.get("api/users")
    }
}