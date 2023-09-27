import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() selectedHero: Hero;
  private id: number;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService
  ) { }

  ngOnInit() {
    // éste código sólo aplica cuando accedemos al componente app-hero-detail
    // como state, mediante: http://localhost:4200/detail/'el_id'
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      // el + convierte un string en number
      this.heroService.getHero(+id).subscribe(hero => this.selectedHero = hero);
    }
  }

  save() {
    this.heroService.updateHero(this.selectedHero).subscribe(
      res => {
        console.log('updateHero ok');
      }
    );
  }

}
