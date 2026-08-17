import { Controller, Get } from "@nestjs/common";

@Controller()
class AppController {
  @Get("/")
  showHello() {
    return "Hello World";
  }
}
