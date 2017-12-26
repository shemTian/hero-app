import {Injectable} from "@angular/core";
import {Hero} from "./hero";
import {Headers} from "@angular/http";
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes';
  private heroes:Hero[];
  constructor(private httpClient:HttpClient){}
  getHeroes(): Promise<Hero[]> {
    // return Promise.resolve(HEROES);

    //lambda表达式 如果“语句或语句块”有返回值时，如果只有一条语句则可以不输写“return”语句，编译器会自动处理，否则必须加上
    // return this.httpClient.get(this.heroesUrl).toPromise().then((dataHeroes:{data:Hero[]})=>{dataHeroes.data as Hero[]}).catch(this.handleError);
    return this.httpClient.get<{data:Hero[]}>(this.heroesUrl).toPromise().then(heroes=>{console.log(heroes);return heroes.data}).catch(this.handleError);
    // this.httpClient.get(this.heroesUrl).subscribe(data => this.heroes = data as Hero[]); //subscribe 不会立即执行
    // console.log(this.heroes);
    // return Promise.resolve(this.heroes);
  }
  private handleError(error: any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
  // 异步获取数据
  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise(resolve => {
      // Simulate server latency with 2 second delay
      setTimeout(() => resolve(this.getHeroes()), 2000);
    });
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes().then(heroes => heroes.find(hero => hero.id === id));
  }
}
