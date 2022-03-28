import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router';
import Online from '../../components/AblyReactEffect';


const ChatComponents = dynamic(() => import('../../components/AblyChatComponent'), { ssr: false });


export default function Home() {

  const router = useRouter();
  const query = router.query;
  let name = Object.values(query)[0];


  return (
    <div className="container">
      <Head>
        <title>Chat Room</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

    <Online />

      <main>
        <h1 className="title">Hello {name} <button className='btn' onClick={() => {router.push('/')}}>Sign Out</button></h1> 
        <ChatComponents />
      </main>


      <style jsx>{`
        .container {
          display: grid;
          grid-template-rows: 1fr 100px;
          min-height: 100vh;
          background-color: #202020;
        }

        .title {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 60px;
          margin: 0;
          color: white;
          background: #005C97;
          background-image: --webkit-radial-gradient( circle farthest-corner at 10% 20%,  rgba(14,174,87,1) 0%, rgba(12,116,117,1) 90% );
          background-image: radial-gradient( circle farthest-corner at 10% 20%,  rgba(14,174,87,1) 0%, rgba(12,116,117,1) 90% );
          box-shadow: 0px 1px 20px 2px rgb(255 255 255 / 50%);
        }

        .btn {
          float: right;
          right: 0;
          position: absolute;
          height: 60px;
          color: white;
          border: none;
          background: linear-gradient(to right, #363795, #005C97);
          font-weight: bold;
          font-size: 0.6em;
        }
        
        .btn:hover {
          background: linear-gradient(90deg, rgba(54,55,149,1) 0%, rgba(0,92,151,1) 62%, rgba(0,125,205,1) 100%);
        }
      
        .btn:disabled, 
        .btn:hover:disabled {
          background: linear-gradient(to right, #363795, #005C97);
          opacity: 0.5;
      }
        @keyframes octocat-wave {
          0%, 100%{transform:rotate(0)}
          20%,60%{transform:rotate(-25deg)}
          40%,80%{transform:rotate(10deg)}}
        }

        '@media (max-width: 1300px)': {
          main {
            width: calc(100%-10px);
            position: relative;
          }
        }
       
      `}</style>
    </div>
  )
}