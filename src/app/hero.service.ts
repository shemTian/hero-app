import {Injectable} from "@angular/core";
import {Hero} from "./hero";
import {Headers} from "@angular/http";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs/Observable";
import {catchError, map, tap} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import {MessageService} from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class HeroService {


  private heroesUrl = 'api/heroes';
  private heroes: Hero[];

  constructor(private httpClient: HttpClient,
              private messageService: MessageService) {
  }

  //获取列表
  getHeroes(): Observable<Hero[]> {
    //lambda表达式 如果“语句或语句块”有返回值时，如果只有一条语句则可以不输写“return”语句，编译器会自动处理，否则必须加上
    return this.httpClient.get<{ data: Hero[] }>(this.heroesUrl).pipe(
      tap(heroes => this.log(`fetched heroes`)),
      map(heroes => heroes.data),
      catchError(this.handleError('getHeroes', []))
    );
  }

  //根据id获取某个hero
  getHero(id: number): Observable<Hero> {
    //subscribe 不会理解返回
    // var hero: Hero;
    // this.getHeroes().subscribe(heroes =>  heroes.find(hero => hero.id == id));
    const url = `${this.heroesUrl}/${id}`;
    return this.httpClient.get<{data:Hero}>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      map(heroe => heroe.data),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.httpClient.put(this.heroesUrl, hero).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

}
