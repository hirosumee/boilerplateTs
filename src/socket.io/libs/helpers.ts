export function isMember(username,channel) {
    for(let member of channel.members){
        if(member.username === username){
            return true;
        }
    }
    return false;
}










