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
  import net.liftweb.json._
  import net.liftweb.{json => liftjson}

  // lol
  implicit val format =DefaultFormats
  def toObj[A : Manifest](json : JsValue) = liftjson.parse(json.toString).extract[A]
  def toJson[A<:AnyRef : Manifest ](x : A) = Json.parse(Serialization.write(x))

}
