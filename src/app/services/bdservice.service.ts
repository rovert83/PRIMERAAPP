import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Noticia } from './noticia';

@Injectable({
  providedIn: 'root'
})
export class BdserviceService {

  //Variable donde se guardará la conexión a BD
  public database!: SQLiteObject;

  //Creación de Tablas
  //para guardar fotos el tipo de dato es BLOB
  tablaNoticia: string = "CREATE TABLE IF NOT EXISTS noticia(id_noticia INTEGER PRIMARY KEY autoincrement, titulo VARCHAR(40) NOT NULL, texto TEXT NOT NULL);";

  //insert iniciales
  registroNoticia: string = "INSERT or IGNORE INTO noticia(id_noticia,titulo,texto) VALUES (1,'Feriado Halloween','Este feriado sera mas largo que el anterior');";

  //observable para manipular todos los registros de la tabla noticia
  listaNoticias = new BehaviorSubject([]);
  //observable para manipular si la BD esta lista  o no para su manipulación
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private alertController: AlertController, private sqlite: SQLite, private platform: Platform) {
    this.crearBD();
   }


  async presentAlert(msj:string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }


  dbState() {
    return this.isDBReady.asObservable();
  }

  fetchNoticias(): Observable<Noticia[]> {
    return this.listaNoticias.asObservable();
  }

  crearBD(){
    //verificar que la plataforma este lista
    this.platform.ready().then(()=>{
      //creamos la BD
      this.sqlite.create({
        name: 'noticias2.db',
        location: 'default'
      }).then((db: SQLiteObject) =>{
        //guardo la conexion en mi variable propia
        this.database = db;
        //mandar a crear las tablas
        this.crearTablas();
      }).catch(e=>{
        this.presentAlert("Error en BD: " + JSON.stringify(e));
      })

    }).catch(e=>{
      this.presentAlert("Error en plataforma: " + JSON.stringify(e));
    })

  }

  async crearTablas(){
    try{
      //ejecutar la creación de tablas
      await this.database.executeSql(this.tablaNoticia,[]);

      //ejecutar los registros
      await this.database.executeSql(this.registroNoticia,[]);

      this.buscarNoticias();
      //le digo al programa que la BD esta lista
      this.isDBReady.next(true);
    }catch(e){
      this.presentAlert("Error en Tablas: " + JSON.stringify(e));
    }
  }

  buscarNoticias() {
    //retorno la ejecución del select
    return this.database.executeSql('SELECT * FROM noticia', []).then(res => {
      //creo mi lista de objetos de noticias vacio
      let items: Noticia[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_noticia: res.rows.item(i).id_noticia,
            titulo: res.rows.item(i).titulo,
            texto: res.rows.item(i).texto
          })
        }

      }
      //actualizamos el observable de las noticias
      this.listaNoticias.next(items as any);
    })
  }

  insertarNoticias(titulo: any, texto: any){
    //let data = [titulo,texto];
    return this.database.executeSql('INSERT INTO noticia(titulo,texto) VALUES (?,?)',[titulo,texto]).then(res=>{
      this.buscarNoticias();
    });

  }

  modificarNoticias(id: any,titulo: any,texto: any){
    //let data = [titulo,texto,id];
    return this.database.executeSql('UPDATE noticia SET titulo = ?, texto = ? WHERE id_noticia = ?',[titulo,texto,id]).then(data2=>{
      this.buscarNoticias();
    })
  }

  eliminarNoticias(id: any){

    return this.database.executeSql('DELETE FROM noticia WHERE id_noticia = ?',[id]).then(a=>{
      this.buscarNoticias();
    })

  }

}
