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
import play.api.libs.iteratee._
import play.api.data.Forms._
import play.api.data.format.Formats._
import model._
import model.Formats._

object Msgs extends Controller {

  def wscon(lng : Float, lat : Float) = WebSocket.async[JsValue] { request =>
    MsgActor.join(Loc("", lng, lat))
  }
}
