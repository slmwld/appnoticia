import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DatalocalService {

  noticias: Article[] = [];

  constructor(private storage: Storage,
    public toastController: ToastController) { 
    this.cargarFavoritos();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500
    });
    toast.present();
  }

  guardarNoticia ( noticia: Article) {

    const exist = this.noticias.find( noti => noti.title === noticia.title );

    if ( !exist ) {
      this.noticias.unshift(noticia);
      this.storage.set('favorito', this.noticias);
    }
    this.presentToast('Elemento Agregado');
  }

  async cargarFavoritos () {
    const favorito = await this.storage.get('favorito');
    if (favorito ) {
      this.noticias = favorito;
    }
  }

  borrarNoticia(noticia: Article) {
    this.noticias = this.noticias.filter( noti => noti.title !== noticia.title );
    this.storage.set('favorito', this.noticias);
    this.presentToast('Elemento Borrado');
  }
}
