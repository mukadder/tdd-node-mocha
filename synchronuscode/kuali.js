// get session id from array of cookies if session i does not exist return null


protectected String getkualiSessionId(final Cookie[] cookies  ) {

    if(cookies !=null) {

        for (Cookie cookie:cookies ){
            if(KRADSESSION.KUALI_SESSION_ID.equals(cookie.getCookieName())){
                return cookie.getValue()
            }
        }
    }
    return null ;

}

// create a session id cookie if does not exist also add cookie to the establised user session

protected void establishSessionCookie(HttpServeletReequest request ,HttpServletResponse response) {

String kualisessionId = this.getkualiSessionId(request.getCookies(()))
    if(sessioid==null){

kualisessionId = UUID.randomUUID().toString()
        response.addCookie(New Cookie(Kradsessionid.kualiSessionid,kualisessionId))

    }
if(KradUtils.getUserSessionfromrequest()==null){

    KradUtils.getUserSessionfromrequest().setSessionId(kualisesssionId)
}


}


private boolean isUserAuthorizedtologin(String principalId){

    return getPermissionService().isAuthorized()
}