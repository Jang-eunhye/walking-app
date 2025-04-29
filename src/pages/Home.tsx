import React, { useEffect, useState } from "react";
import { Cloud, Wind, Droplets, Umbrella } from "lucide-react";
import { getCurrentWeather, getAirQuality, getForecast } from "../api/weather";

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  name: string;
}

interface AirQualityData {
  list: Array<{
    components: {
      pm2_5: number;
    };
    main: {
      aqi: number;
    };
  }>;
}

interface ForecastData {
  list: Array<{
    pop: number;
  }>;
}

const Home: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("위치 정보 요청 시작");
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            console.log("위치 정보 받음:", position.coords);
            const { latitude, longitude } = position.coords;

            console.log("API 호출 시작");
            const [weather, air, forecastData] = await Promise.all([
              getCurrentWeather(latitude, longitude),
              getAirQuality(latitude, longitude),
              getForecast(latitude, longitude),
            ]);
            console.log("API 응답 받음:", { weather, air, forecastData });

            setWeatherData(weather);
            setAirQuality(air);
            setForecast(forecastData);
            setLoading(false);
          },
          (error) => {
            console.error("위치 정보 에러:", error);
            setError("위치 정보를 가져올 수 없습니다.");
            setLoading(false);
          },
        );
      } catch (error) {
        console.error("API 호출 에러:", error);
        setError("데이터를 가져오는데 실패했습니다.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen w-screen items-center justify-center bg-green-700">
        <div className="text-white">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen w-screen items-center justify-center bg-green-700">
        <div className="text-white">{error}</div>
      </div>
    );
  }

  // 공기질 상태 텍스트 변환 함수
  const getAirQualityStatus = (aqi: number) => {
    switch (aqi) {
      case 1:
        return "매우 좋음";
      case 2:
        return "좋음";
      case 3:
        return "보통";
      case 4:
        return "나쁨";
      case 5:
        return "매우 나쁨";
      default:
        return "알 수 없음";
    }
  };

  // 바람 상태 텍스트 변환 함수
  const getWindStatus = (speed: number) => {
    if (speed < 1) return "약함";
    if (speed < 3) return "보통";
    if (speed < 5) return "강함";
    return "매우 강함";
  };

  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-green-700">
      <div className="w-full max-w-[360px] p-2">
        {/* 위치 정보 */}
        <div className="mb-4 text-center text-white">
          <div className="text-sm font-medium">{weatherData?.name}</div>
        </div>

        {/* 기온과 날씨 점수 */}
        <div className="mb-6 flex gap-2">
          {/* 기온 */}
          <div className="flex-1 rounded-lg bg-white/10 p-3 text-white backdrop-blur-sm">
            <div className="flex items-center justify-around">
              <div className="text-center">
                <div className="mb-1 text-xs text-white/80">기온</div>
                <div className="text-2xl font-bold">
                  {Math.round(weatherData?.main.temp || 0)}°C
                </div>
              </div>
              <div className="text-center">
                <div className="mb-1 text-xs text-white/80">체감온도</div>
                <div className="text-2xl font-bold">
                  {Math.round(weatherData?.main.feels_like || 0)}°C
                </div>
              </div>
            </div>
          </div>

          {/* 산책 점수 */}
          <div className="flex-1 rounded-lg bg-white/10 p-3 text-white backdrop-blur-sm">
            <div className="text-center">
              <div className="mb-1 text-xs text-white/80">산책 점수</div>
              <div className="text-3xl font-bold">85점</div>
            </div>
          </div>
        </div>

        {/* 날씨 카드 그리드 */}
        <div className="grid grid-cols-4 gap-1">
          {/* 미세먼지 카드 */}
          <div>
            <div className="mb-0.5 text-center text-xs font-medium text-white">미세먼지</div>
            <div className="h-24 rounded-lg bg-white/10 p-2 text-white backdrop-blur-sm">
              <div className="flex h-full flex-col items-center justify-center">
                <Cloud className="mb-1 h-5 w-5" />
                <div className="mb-1 text-sm">
                  {getAirQualityStatus(airQuality?.list[0].main.aqi || 0)}
                </div>
                <div className="text-xs text-white/80">
                  {Math.round(airQuality?.list[0].components.pm2_5 || 0)} µg/m³
                </div>
              </div>
            </div>
          </div>

          {/* 바람 카드 */}
          <div>
            <div className="mb-0.5 text-center text-xs font-medium text-white">바람</div>
            <div className="h-24 rounded-lg bg-white/10 p-2 text-white backdrop-blur-sm">
              <div className="flex h-full flex-col items-center justify-center">
                <Wind className="mb-1 h-5 w-5" />
                <div className="mb-1 text-sm">{getWindStatus(weatherData?.wind.speed || 0)}</div>
                <div className="text-xs text-white/80">
                  {weatherData?.wind.speed.toFixed(1)} m/s
                </div>
              </div>
            </div>
          </div>

          {/* 강수확률 카드 */}
          <div>
            <div className="mb-0.5 text-center text-xs font-medium text-white">강수확률</div>
            <div className="h-24 rounded-lg bg-white/10 p-2 text-white backdrop-blur-sm">
              <div className="flex h-full flex-col items-center justify-center">
                <Umbrella className="mb-1 h-5 w-5" />
                <div className="mb-1 text-sm">
                  {Math.round((forecast?.list[0].pop || 0) * 100)}%
                </div>
                <div className="text-xs text-white/80">오늘</div>
              </div>
            </div>
          </div>

          {/* 습도 카드 */}
          <div>
            <div className="mb-0.5 text-center text-xs font-medium text-white">습도</div>
            <div className="h-24 rounded-lg bg-white/10 p-2 text-white backdrop-blur-sm">
              <div className="flex h-full flex-col items-center justify-center">
                <Droplets className="mb-1 h-5 w-5" />
                <div className="mb-1 text-sm">{weatherData?.main.humidity}%</div>
                <div className="text-xs text-white/80">현재</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
