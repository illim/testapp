package model

case class Loc(address : String, lng : Float, lat : Float)
case class Msg(name : String, location : Loc, title : String, body : Option[String])
