import React from "react";
import { Cloud, Wind, Droplets, Umbrella } from "lucide-react";

const Home: React.FC = () => {
  return (
    <div className="flex min-h-screen w-screen items-center justify-center bg-green-700">
      <div className="w-full max-w-[360px] p-2">
        {/* 기온과 날씨 점수 */}
        <div className="mb-6 flex gap-2">
          {/* 기온 */}
          <div className="flex-1 rounded-lg bg-white/10 p-3 text-white backdrop-blur-sm">
            <div className="text-center">
              <div className="text-xs text-white/80">서울시 강남구</div>
              <div className="text-3xl font-bold">23°C</div>
            </div>
          </div>

          {/* 날씨 점수 */}
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
                <div className="mb-1 text-sm">매우 좋음</div>
                <div className="text-xs text-white/80">15 µg/m³</div>
              </div>
            </div>
          </div>

          {/* 바람 카드 */}
          <div>
            <div className="mb-0.5 text-center text-xs font-medium text-white">바람</div>
            <div className="h-24 rounded-lg bg-white/10 p-2 text-white backdrop-blur-sm">
              <div className="flex h-full flex-col items-center justify-center">
                <Wind className="mb-1 h-5 w-5" />
                <div className="mb-1 text-sm">강함</div>
                <div className="text-xs text-white/80">3.2 m/s</div>
              </div>
            </div>
          </div>

          {/* 강수확률 카드 */}
          <div>
            <div className="mb-0.5 text-center text-xs font-medium text-white">강수확률</div>
            <div className="h-24 rounded-lg bg-white/10 p-2 text-white backdrop-blur-sm">
              <div className="flex h-full flex-col items-center justify-center">
                <Umbrella className="mb-1 h-5 w-5" />
                <div className="mb-1 text-sm">30%</div>
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
                <div className="mb-1 text-sm">65%</div>
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
