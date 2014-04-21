package model

object Loc {
  val rng = 0.1f
}
case class Loc(address : String, lng : Float, lat : Float){
  import Loc._

  def inRng(x : Float, y : Float) : Boolean = x < y + rng && x > y - rng
  def inRng(l : Loc) : Boolean = inRng(lng, l.lng) && inRng(lat, l.lat)
}
case class User(name : String, location : Loc)
case class Msg(title : String, body : Option[String])
case class UserMsg(user : User, msg : Msg)


object Formats {
  import play.api.libs.json._

  implicit val locformat = Json.format[Loc]
  implicit val userformat = Json.format[User]
  implicit val msgformat = Json.format[Msg]
  implicit val usermsgformat = Json.format[UserMsg]
}
