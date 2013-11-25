package model

case class Loc(address : String, lng : BigDecimal, lat : BigDecimal)
case class Msg(name : String, location : Loc, title : String, body : Option[String])
