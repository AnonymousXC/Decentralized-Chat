import Head from "next/head";
import { useRouter } from "next/router";


const Page = () => {
  let router = useRouter();
  let name = "";
  return (
  <>
  <div className="full-bg">
    <Head>
      <title>Chat App Login</title>
    </Head>
    <div className="center">
        <input type="text" className="margin txt"  onChange={(e) => name= e.target.value} placeholder="Enter Your Name..."></input>
        <br></br> <br></br>
        <button className="margin btn" onClick={() => {
          if(name) {
          router.push({
            pathname: '/chat',
            query: {n: name}
            }) }}}>Enter</button>
    </div>
    <style jsx> 
        { `
        .margin {
          color: #fff;
        }
        .txt {
          position: absolute;
          background-color: #303030;
          border: none;
          font-size: 70px;
          outline: none;
          border-radius: 25px;
          padding: 25px;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-150%)
        }
        .btn {
          background-color: #303030;
          color: #fff;
          border: none;
          font-size: 60px;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, 0%);
          border-radius: 25px;
          padding: 25px;
        }
        .btn:hover {
          background-color: rgba(255,255,255,1);
          color: #000;
        }
        .txt:focus {
          background-color: rgba(255,255,255,1);
          color: #000;
        }
        `
         }
        </style>
    </div>
  </> 
  )
}

export default Page;
