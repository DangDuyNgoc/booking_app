import { Controller, Get } from "@nestjs/common";

type ApiHealth = {
  status: "ok";
  service: "api";
  timestamp: string;
};

@Controller("health")
export class HealthController {
  @Get()
  getHealth(): ApiHealth {
    return {
      status: "ok",
      service: "api",
      timestamp: new Date().toISOString()
    };
  }
}
