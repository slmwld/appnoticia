import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { browser } from 'protractor';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DatalocalService } from 'src/app/services/datalocal.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
@Input() noticia: Article;
@Input() indice: number;
@Input() enFavoritos;
  constructor( private iab: InAppBrowser,
               private actionSheetCtrl : ActionSheetController,
               private socialSharing: SocialSharing,
               private dataLocalService: DatalocalService) { }

  ngOnInit() {}

  abrirNoticia() {
    console.log('Noticia', this.noticia.url);
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async menu() {
    let guardarBorrarBtn;
    if (this.enFavoritos) {
      guardarBorrarBtn = {
        text: 'Borrar',
        icon: 'trash',
        cssClass: 'action-dark borrar',
        handler: () => {
          console.log('Borrar');
          this.dataLocalService.borrarNoticia( this.noticia);
        }
      };
      //borrar de favoritos
    } else {
      guardarBorrarBtn = {
        text: 'Favoritos',
        icon: 'star',
        cssClass: 'action-dark favs',
        handler: () => {
          console.log('favoritos');
          this.dataLocalService.guardarNoticia( this.noticia);
        }
      };
    }
    const actionSheet = await this.actionSheetCtrl.create({

      buttons: [
        {
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark compa',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
        }
      },
      guardarBorrarBtn,
       {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark canc',
        handler: () => {
          console.log('Cancelar');
        }
      }]
    });
    await actionSheet.present();
  }
}

