import { Module, Controller, Get, Injectable, Query } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { quotes, Quote } from "./data/data";

@Injectable()
class AppService {
  private readonly quotes: Quote[] = quotes;
  findAll(author?: string): Quote[] {
    if (author) {
      return this.quotes.filter(
        (qoute) => qoute.author.toLowerCase() === author.toLowerCase,
      );
    }
    return this.quotes;
  }
}

@Controller()
class AppController {
  constructor(private readonly appService: AppService) {}
  @Get("/quotes")
  findAll(@Query("author") author?: string) {
    return this.appService.findAll(author);
  }
}

@Module({
  controllers: [AppController],
  providers: [AppService],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  console.log(`Server is running on port ${await app.getUrl()}`);
}

bootstrap();
