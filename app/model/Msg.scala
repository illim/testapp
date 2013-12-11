package model

case class Loc(address : String, lng : Float, lat : Float)
case class User(name : String, location : Loc)
case class Msg(title : String, body : Option[String])
case class UserMsg(user : User, msg : Msg)
