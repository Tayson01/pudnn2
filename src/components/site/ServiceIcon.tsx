import { CircleDot, Gauge, LifeBuoy, Navigation, Truck, Wrench } from "lucide-react";

import type { Service } from "@/lib/site-data";

const icons = {
  lifebuoy: LifeBuoy,
  wrench: Wrench,
  circle: CircleDot,
  gauge: Gauge,
  truck: Truck,
  navigation: Navigation,
} as const;

export function ServiceIcon({ name, className = "size-5" }: { name: Service["icon"]; className?: string }) {
  const Icon = icons[name];
  return <Icon className={className} />;
}
