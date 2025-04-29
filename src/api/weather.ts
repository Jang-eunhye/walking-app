import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";
// 현재 날씨와 체감온도, 바람, 습도 등을 가져오는 함수
export const getCurrentWeather = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: "metric", // 섭씨 온도 사용
        lang: "kr", // 한국어 응답
      },
    });
    return response.data;
  } catch (error) {
    console.error("날씨 데이터를 가져오는데 실패했습니다:", error);
    throw error;
  }
};

// 공기질(미세먼지) 데이터를 가져오는 함수
export const getAirQuality = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/air_pollution`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("공기질 데이터를 가져오는데 실패했습니다:", error);
    throw error;
  }
};

// 5일/3시간 예보에서 강수확률을 가져오는 함수
export const getForecast = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: "metric",
        lang: "kr",
      },
    });
    return response.data;
  } catch (error) {
    console.error("예보 데이터를 가져오는데 실패했습니다:", error);
    throw error;
  }
};
