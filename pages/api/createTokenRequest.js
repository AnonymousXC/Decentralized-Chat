import Ably from "ably/promises";


export default async function handler(req, res) {
    const client = new Ably.Realtime({
        key: process.env.ABLY_API_KEY,
        queryTime: true
    });

    const tokenRequestData = await client.auth.createTokenRequest({ clientId: 'chat-app' });
    res.status(200).json(tokenRequestData);
};