var requestsQueue = [];
var requestResolveCallbackQueue = [];

function nativeAjax (requestObj) {
    //this is your actual ajax function
    //which will return a promise

    //after finishing the ajax call you call the .next() function of syncRunner
    //you need to put it in the suceess callback or in the .then of the promise
    $.ajax(requestObj).then(function (responseData) {
        (requestResolveCallbackQueue.shift())(responseData);
        syncTaskPointer.next();
    });
}

function* syncRunner(){
    while(requestsQueue.length>0){
        yield nativeAjax(requestsQueue.shift());
    }

    //set the pointer to null
    syncTaskPointer = null;
    console.log("all resolved");
};

ajaxSync = function (requestObj) {
    requestsQueue.push(requestObj);
    if(!syncTaskPointer){
        syncTaskPointer = syncRunner();
        syncTaskPointer.next();
    }
    return new Promise(function (resolve, reject) {
        var responseFlagFunc = function (data) {
            resolve(data);
        }
        requestResolveCallbackQueue.push(responseFlagFunc);
    });
}

ajaxSync("http://myApis.com/getUser");
ajaxSync("http://myApis.com/getHisFriends");
ajaxSync("http://myApis.com/unfriendThisParticularFriend");
ajaxSync("http://myApis.com/dateHisGirlFriend");
/**
 * Created by mukadder on 2/23/17.
 */
