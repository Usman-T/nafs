import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

const ProgressSkeleton = () => {
  const size = 400;
  const center = size / 2;
  const radius = size * 0.4;
  const hexRadius = radius * 0.8;

  const generateHexPoints = (level: number) => {
    return Array.from({ length: 6 }).map((_, j) => {
      const angle = (Math.PI * 2 * j) / 6 - Math.PI / 2;
      return {
        x: center + hexRadius * level * Math.cos(angle),
        y: center + hexRadius * level * Math.sin(angle),
      };
    });
  };

  return (
    <div className="space-y-8 p-8">
      <div>
        <Card className="bg-[#282828] border-[#3c3836] overflow-hidden">
          <CardHeader className="pb-3">
            <CardTitle>
              <Skeleton className="h-6 w-40 bg-[#3c3836]" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="relative mb-8 w-full max-w-md mx-auto">
                <div className="w-full flex justify-center">
                  <svg
                    width={size}
                    height={size}
                    viewBox={`0 0 ${size} ${size}`}
                    className="overflow-visible"
                  >
                    {[0.2, 0.4, 0.6, 0.8, 1].map((level, i) => (
                      <polygon
                        key={i}
                        points={generateHexPoints(level)
                          .map((p) => `${p.x},${p.y}`)
                          .join(" ")}
                        fill="none"
                        stroke="#3c3836"
                        strokeWidth="1"
                        opacity={0.5}
                      />
                    ))}

                    {Array.from({ length: 6 }).map((_, i) => (
                      <line
                        key={i}
                        x1={center}
                        y1={center}
                        x2={
                          center +
                          radius * Math.cos((Math.PI * 2 * i) / 6 - Math.PI / 2)
                        }
                        y2={
                          center +
                          radius * Math.sin((Math.PI * 2 * i) / 6 - Math.PI / 2)
                        }
                        stroke="#3c3836"
                        strokeWidth="1"
                        opacity={0.5}
                      />
                    ))}

                    {Array.from({ length: 6 }).map((_, i) => {
                      const pointX =
                        center +
                        radius *
                          0.8 *
                          Math.cos((Math.PI * 2 * i) / 6 - Math.PI / 2);
                      const pointY =
                        center +
                        radius *
                          0.8 *
                          Math.sin((Math.PI * 2 * i) / 6 - Math.PI / 2);
                      const labelX =
                        center +
                        radius *
                          1.15 *
                          Math.cos((Math.PI * 2 * i) / 6 - Math.PI / 2);
                      const labelY =
                        center +
                        radius *
                          1.15 *
                          Math.sin((Math.PI * 2 * i) / 6 - Math.PI / 2);

                      return (
                        <g key={i}>
                          <circle
                            cx={pointX}
                            cy={pointY}
                            r={8}
                            fill="#3c3836"
                          />
                          <text
                            x={labelX}
                            y={labelY}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fontSize="14"
                            fill="#3c3836"
                          ></text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>

              <div className="mt-4 text-center space-y-2">
                <Skeleton className="h-6 w-48 mx-auto bg-[#3c3836]" />
                <Skeleton className="h-12 w-24 mx-auto bg-[#3c3836]" />
              </div>

              <Carousel className="gap-2 w-full">
                <CarouselContent className="w-full -ml-1">
                  {Array.from({ length: 7 }).map((_, i) => (
                    <CarouselItem
                      className="basis-1/3 flex items-center flex-col justify-center sm:basis-1/5 lg:basis-1/7 pt-4 pl-1 "
                      key={i}
                    >
                      <Skeleton className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-[#3c3836]" />
                      <Skeleton className="h-4 w-16 mt-2 bg-[#3c3836]" />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressSkeleton;
