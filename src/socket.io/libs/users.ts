
class UserSocket {
    private USERSONLINE : Map<string,Set<string>> = new Map<string,Set<string>>();
    public UserSocket(){}
    public setUserOnline(username:string,socketID:string):void{
        if(!this.USERSONLINE.has(username)){
            this.USERSONLINE.set(username,new Set<string>());
        }
        this.USERSONLINE.get(username).add(socketID);
    }
    public removeSocket(username:string,socketID:string):void{
        if(this.USERSONLINE.has(username)){
            if(this.USERSONLINE.get(username).has(socketID)){
                this.USERSONLINE.get(username).delete(socketID);
                if(this.USERSONLINE.get(username).size === 0){
                    this.USERSONLINE.delete(username)
                }
            } else {
                throw new Error('socketID is not online');
            }
        } else {
            throw new Error('user is not online');
        }
    }
    public getUserOnline():any{
        return this.USERSONLINE.keys();
    }
}
export default new UserSocket();