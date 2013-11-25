package controllers

import java.util.Date
import play.api._
import play.api.mvc._
import play.api.data._
import play.api.data.Forms._
import model._

object Msgs extends Controller {

  var date = new Date()
  

  val msgForm : Form[Msg] = Form(

    mapping(
      "name" -> text(minLength = 4),
      "location" -> mapping(
          "address" -> text(minLength = 4),
          "lng" -> bigDecimal,
          "lat" -> bigDecimal
        )(Loc.apply)(Loc.unapply),
      "title" -> text(minLength = 4),
      "body" -> optional(text)
   )(Msg.apply)(Msg.unapply)
  )

  def submit = Action { implicit request =>
    msgForm.bindFromRequest.fold(
      errors => {
        println(errors)
        BadRequest("noooo")
      },
      msg => {
        println(msg)
        Ok("")
      }
    )
  }

}
