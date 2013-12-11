package controllers

import scala.collection._
import java.util.Date
import scala.reflect._
import play.api._
import play.api.mvc._
import play.api.data._
import net.liftweb.json._
import net.liftweb.{json => liftjson}
import play.api.libs.json._
import play.api.data.Forms._
import play.api.data.format.Formats._
import model._

object Msgs extends Controller {

  var date = new Date()
  var msgs = Map.empty[User, List[UserMsg]].withDefaultValue(Nil)

  def submit = Action[JsValue](parse.json) { implicit request =>
    val userMsg = toObj[UserMsg](request.body)
    msgs += userMsg.user -> (userMsg :: msgs(userMsg.user))
    Ok("yup")
  }

  val rng = 0.1f
  def inRng(x : Float, y : Float) = x < y + rng && x > y - rng
  def list = Action[JsValue](parse.json) { implicit request =>
    val loc = toObj[Loc](request.body)
    var res = msgs.filter{ case (u, ms) =>
      (inRng(u.location.lng, loc.lng)
       && inRng(u.location.lat, loc.lat))
    }
    Ok(toJson(res.toList.flatMap(_._2)))
  }

  // lol
  implicit val format =DefaultFormats
  def toObj[A : Manifest](json : JsValue) = liftjson.parse(json.toString).extract[A]
  def toJson[A<:AnyRef : Manifest ](x : A) = Json.parse(Serialization.write(x))

}
