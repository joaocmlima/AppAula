import { Component, ViewChild } from '@angular/core';
import { MoviesService } from '../theMovieDB/movies.service';
import { LoadingController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers: [MoviesService]
})
export class Tab2Page {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(public movieService:MoviesService, public loadingController: LoadingController) {}

  public lista_filmes = new Array<any>();
  public page:number = 1;

  efeitoRefresh(event){
    this.page = 1;  
    this.carregaPagina();

    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  carregaPagina(){
    this.movieService.getPopularMovies(this.page, 'pt-BR').subscribe(
      data => {
        const response = (data as any);
        if(this.page == 1){
          this.lista_filmes = response.results;
        }else{
          this.lista_filmes = this.lista_filmes.concat(response.results);
        }
        console.log(this.lista_filmes); 
      },
      error => {
        console.log(error);
      }
    )
  }

  async efeitoLoading(){
    const loading = await this.loadingController.create({
      message: 'Carregando filmes', 
      duration: 1000
    });

    await loading.present();

    const { role, data } = await loading.onDidDismiss();
  }

  ionViewDidEnter(){
    this.efeitoLoading();
    this.carregaPagina();
  }


  efeitoScrollInfinito(event) {
    setTimeout(() => {
      this.page++;
      this.carregaPagina();
      console.log('Done');
      event.target.complete();
    }, 1000);
  }

}
