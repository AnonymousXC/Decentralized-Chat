import Ably from "ably/promises";
import { useEffect, useState } from 'react'
import { useRouter } from "next/router";


const ably = new Ably.Realtime.Promise({ authUrl: '/api/createTokenRequest' });
let sendJoinMsg = true;
let channel;
let onlineMember = 0

export function useChannel(channelName, callbackOnMessage) {

    const router = useRouter();
    let username = Object.values(router.query)[0]

    channel = ably.channels.get(channelName);

    const onMount = () => {
        channel.subscribe(msg => { callbackOnMessage(msg); });
    }

    const onUnmount = () => {
        channel.unsubscribe();
    }

    const useEffectHook = () => {
        onMount();
        return () => { onUnmount(); };
    };

    channel.once('attached', () => {
        if(sendJoinMsg == true && username) {
            channel.publish({name: "Bot", data: username + " has joined the chat"});
            sendJoinMsg = false
        }
    });

    channel.presence.update(username , function(err) {
        if(err) { return console.error("Error updating presence data"); }
      });

    channel.presence.get((err, member) => {
        if(err) {return}
        onlineMember = member.length;
    })


    useEffect(useEffectHook);

    return [channel, ably];
}


const Online = () => {


    const [memOn, setMemOn] = useState(0)
    setInterval(() => {
        setMemOn(onlineMember)
    }, 1000)



    return(
      <div className="full-side-bar">
      <div className="online-bar">
      <div className="green-btn"><span className="num-online">{memOn} </span></div>
      <div>
          <ul className="rules-li">
              <li>BE CAREFUL WHAT YOU TYPE</li>
              <li>CONDUCT YOURSELF AS YOU WOULD IN THE REAL WORLD</li>
              <li>RESPECT OTHERS’ PRIVACY</li>
              <li>THINK TWICE BEFORE POSTING ANYTHING</li>
              <li>USE HUMOR WHEN APPROPRIATE</li>
              <li>BE ETHICAL</li>
              <li>THINK BEFORE YOU CLICK</li>
              <li>PUNCTUATE!</li>
              <li>ASK BEFORE DOWNLOADING</li>
              <li>STICK TO APPROVED WEBSITES</li>
              <li> BE YOURSELF (AUTHENTICITY)</li>
              <li>USE PROFESSIONAL LANGUAGE</li>
              <li>BE ACCEPTING OF OTHERS’ OPINIONS</li>
              <li>USE SALUTATIONS</li>
              <li>EMBRACE HYPERLINKS – WITH CARE</li>
              <li>BE BRIEF</li>
              <li>NO TO DISCRIMINATION</li>
              <li>NO TO GANGING UP</li>
              <li>ENJOY HERE!</li>
          </ul>
      </div>
        </div>
  </div>)
  }
  
export default Online;