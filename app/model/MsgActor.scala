package model

import akka.actor._
import akka.util.Timeout
import akka.pattern.ask
import scala.concurrent.duration._
import play.api._
import play.api.libs.json._
import play.api.libs.iteratee._
import play.api.libs.concurrent._
import play.api.Play.current
import play.api.libs.concurrent.Execution.Implicits._
import Formats._

object MsgActor {

  implicit val timeout = Timeout(1 second)

  lazy val actor = Akka.system.actorOf(Props[MsgActor])

  def join(loc : Loc) : scala.concurrent.Future[(Iteratee[JsValue,_], Enumerator[JsValue])] = {
    (actor ? Join(loc)).map {
      case Connected(msgs, enumerator) =>
        val iteratee = Iteratee.foreach[JsValue] { event =>
          val userMsg = toObj[UserMsg](event)
          actor ! Talk(userMsg)
        }
        val start = Enumerator(toJson(msgs))
        val locEnum = start.andThen(
          enumerator.through(Enumeratee.collect{ case (u, json) if u.location.inRng(loc) =>
            json
          }))
        (iteratee, locEnum)
    }

  }

}

class MsgActor extends Actor {
  import java.util.{Date, Calendar}

  val calendar = Calendar.getInstance
  var currentDay = calendar.get(Calendar.DAY_OF_YEAR)
  var msgs = Map.empty[User, List[UserMsg]].withDefaultValue(Nil)
  val (enumerator, channel) = Concurrent.broadcast[(User, JsValue)]

  def receive = {
    case Join(loc) =>
      val day = calendar.get(Calendar.DAY_OF_YEAR)
      if (day != currentDay){
        msgs = msgs.empty
        currentDay = day
      }
      var msgInRngs = msgs.filter{ case (u, _) => u.location.inRng(loc) }.toList.flatMap(_._2)
      sender ! Connected(msgInRngs, enumerator)

    case Talk(userMsg) =>
      msgs += userMsg.user -> (userMsg :: msgs(userMsg.user))
      notifyAll(userMsg)

  }

  def notifyAll(userMsg : UserMsg) {
    channel.push((userMsg.user, toJson(userMsg)))
  }

}

case class Join(loc : Loc)
case class Talk(userMsg : UserMsg)
case class Connected(msgs : List[UserMsg], enumerator : Enumerator[(User, JsValue)])
