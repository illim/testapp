package controllers

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
  var msgs = List.empty[Msg]

  val msgForm : Form[Msg] = Form(
    mapping(
      "name" -> text(minLength = 2),
      "location" -> mapping(
          "address" -> text(minLength = 4),
          "lng" -> of(floatFormat),
          "lat" -> of(floatFormat)
        )(Loc.apply)(Loc.unapply),
      "title" -> text(minLength = 4),
      "body" -> optional(text)
   )(Msg.apply)(Msg.unapply)
  )

  def submit = Action { implicit request =>
    msgForm.bindFromRequest.fold(
      form => {
        println("errors in "+form)
        BadRequest(toJson(form.errors))
      },
      msg => {
        msgs = msg :: msgs
        Ok("yup")
      }
    )
  }

  val rng = 0.1f
  def inRng(x : Float, y : Float) = x < y + rng && x > y - rng
  def list = Action[JsValue](parse.json) { implicit request =>
    val loc = toObj[Loc](request.body)
    var res = msgs.filter{ m =>
      (inRng(m.location.lng, loc.lng)
       && inRng(m.location.lat, loc.lat))
    }
    Ok(toJson(res))
  }

  // lol
  implicit val format =DefaultFormats
  def toObj[A : Manifest](json : JsValue) = liftjson.parse(json.toString).extract[A]
  def toJson[A<:AnyRef : Manifest ](x : A) = Json.parse(Serialization.write(x))

}
