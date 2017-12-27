import {Component, Input, OnInit} from '@angular/core';
import {Hero} from "./hero";
import {HeroService} from "./hero.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'hero-detail',
  templateUrl:'hero-detail.component.html',
  styleUrls:['hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit{
  @Input() hero: Hero;

  constructor(private heroService: HeroService,
              private route: ActivatedRoute,
              private location: Location) {
  }
  goBack():void{
    this.location.back();
  }
  ngOnInit():void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }
}
