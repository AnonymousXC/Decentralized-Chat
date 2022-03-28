import React, { useEffect, useState } from 'react';
import { useChannel } from "./AblyReactEffect";
import styles from './AblyChatComponent.module.css';
import { useRouter } from 'next/router';



const ChatComponents = () => {

  let inputBox = null;
  let messageEnd = null;
  const router = useRouter();
  let queries = router.query;
  let username = Object.values(queries)[0];


  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState([]);
  const messageTextIsEmpty = messageText.trim().length === 0;


  const [channel, ably] = useChannel("chat-demo", (message) => {
    const history = receivedMessages.slice(-199);
    setMessages([...history, message]);
  });



  const sendChatMessage = (messageText) => {
    channel.publish({ name: username, data: messageText});
    setMessageText("");
    inputBox.focus();
  }

  const handleFormSubmission = (event) => {
    event.preventDefault();
    sendChatMessage(messageText);
  }

  const handleKeyPress = (event) => {
    if ((event.charCode == 13 && event.shiftKey) || messageTextIsEmpty || event.charCode !== 13) {
      return;
    }
    sendChatMessage(messageText);
    event.preventDefault();
  }

  const unixTimeToHumanReadable = (seconds) => 
    {
 
        // Save the time in Human
        // readable format
        let ans = "";
 
        // Number of days in month
        // in normal year
        let daysOfMonth = [ 31, 28, 31, 30, 31, 30,
                              31, 31, 30, 31, 30, 31 ];
 
        let currYear, daysTillNow, extraTime,
            extraDays, index, date, month, hours,
            minutes, secondss, flag = 0;
 
        // Calculate total days unix time T
        daysTillNow = parseInt(seconds / (24 * 60 * 60), 10);
        extraTime = seconds % (24 * 60 * 60);
        currYear = 1970;
 
        // Calculating current year
        while (daysTillNow >= 365)
        {
            if (currYear % 400 == 0 ||
               (currYear % 4 == 0 &&
                currYear % 100 != 0))
            {
                daysTillNow -= 366;
            }
            else
            {
                daysTillNow -= 365;
            }
            currYear += 1;
        }
 
        // Updating extradays because it
        // will give days till previous day
        // and we have include current day
        extraDays = daysTillNow + 1;
 
        if (currYear % 400 == 0 ||
           (currYear % 4 == 0 &&
            currYear % 100 != 0))
            flag = 1;
 
        // Calculating MONTH and DATE
        month = 0; index = 0;
        if (flag == 1)
        {
            while (true)
            {
                if (index == 1)
                {
                    if (extraDays - 29 < 0)
                        break;
 
                    month += 1;
                    extraDays -= 29;
                }
                else
                {
                    if (extraDays -
                        daysOfMonth[index] < 0)
                    {
                        break;
                    }
                    month += 1;
                    extraDays -= daysOfMonth[index];
                }
                index += 1;
            }
        }
        else
        {
            while (true)
            {
                if (extraDays - daysOfMonth[index] < 0)
                {
                    break;
                }
                month += 1;
                extraDays -= daysOfMonth[index];
                index += 1;
            }
        }
 
        // Current Month
        if (extraDays > 0)
        {
            month += 1;
            date = extraDays;
        }
        else
        {
            if (month == 2 && flag == 1)
                date = 29;
            else
            {
                date = daysOfMonth[month - 1];
            }
        }
 
        // Calculating HH:MM:YYYY
        hours = parseInt(extraTime / 3600, 10);
        minutes = parseInt((extraTime % 3600) / 60, 10);
        secondss = parseInt((extraTime % 3600) % 60, 10);

        if(hours < 10)
          hours = "0" + hours.toString();
        if(minutes < 10) 
          minutes = "0" + minutes.toString();
        if(secondss < 10)
          secondss = "0" + secondss.toString();

        // ans += date.toString();
        // ans += "/";
        // ans += month.toString();
        // ans += "/";
        // ans += currYear.toString();
        // ans += " ";
        ans += hours.toString();
        ans += ":";
        ans += minutes.toString();
        ans += ":";
        ans += secondss.toString();
 
        // Return the time
        return ans;
    }

  const messages = receivedMessages.map((message, index) => {
    const author = message.connectionId === ably.connection.id ? "me" : "other";
    if(message.name == "Bot") {
      console.log("");
      return (
        <strong className={styles.botSpan} key={index}>
      <span>{message.data}</span>
      </strong>
      )
    }
    else {
      if(author == "me")
        message.name = "You"
      return <div data-author-div={author} className={styles.messageDiv} key={index}> 
      <span className="author-name"> <b> {message.name} </b></span> <br /> <br />
        <span className={styles.message} data-author={author}>{message.data}</span>
        <span className={styles.timeStyle}>{unixTimeToHumanReadable(parseInt(message.timestamp/1000))}</span>
        </div>
    }
  });

  //date.toUTCString(message.timestamp).slice(-11, -4)


  useEffect(() => {
    messageEnd.scrollIntoView({ behaviour: "smooth" });
  });

  return (
    <>
    <div className={styles.chatHolder}>
      <div className={styles.chatText}>
        {messages}
        <div ref={(element) => { messageEnd = element; }}></div>
      </div>
      <form onSubmit={handleFormSubmission} className={styles.form}>
        <textarea
          ref={(element) => { inputBox = element; }}
          value={messageText}
          placeholder="Type a message..."
          onChange={e => setMessageText(e.target.value)}
          onKeyPress={handleKeyPress}
          className={styles.textarea}
        ></textarea>
        <button type="submit" className={styles.button} disabled={messageTextIsEmpty}>Send</button>
      </form>
    </div>
    </>
  )
}

export default ChatComponents;