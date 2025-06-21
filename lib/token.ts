"use server";
import axios from "axios";
import redis from "./redis";

const TOKEN_REDIS_KEY = "quran_api_access_token";

export async function getQuranApiToken(): Promise<string> {
  const cachedToken = await redis.get(TOKEN_REDIS_KEY);
  console.log("Cached token:", cachedToken);
  if (cachedToken) {
    return cachedToken;
  }

  const auth = Buffer.from(
    `${process.env.QURAN_API_CLIENT_ID}:${process.env.QURAN_API_CLIENT_SECRET}`
  ).toString("base64");

  try {
    const tokenResponse = await axios({
      method: "post",
      url: "https://oauth2.quran.foundation/oauth2/token",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: "grant_type=client_credentials&scope=content",
    });

    const token = tokenResponse.data.access_token;
    const expiresIn = tokenResponse.data.expires_in || 3600;

    console.log("Got this token babyyy:", token);

    const saveditem = await redis.set(TOKEN_REDIS_KEY, token, {
      ex: expiresIn - 10,
    });

    console.log("Saved token to Redis:", saveditem);
    return tokenResponse.data.access_token;
  } catch (error) {
    console.error("Error getting access token:", error);
  }
}
