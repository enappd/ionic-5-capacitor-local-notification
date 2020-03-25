import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ILocalNotificationActionType, LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public clickSub: any;

  constructor(
    private localNotifications: LocalNotifications,
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }
  async presentAlert(data) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: data,
      buttons: ['OK']
    });

    await alert.present();
  }

  unsub() {
    this.clickSub.unsubscribe();
  }
  simpleNotif() {
    this.clickSub = this.localNotifications.on('click').subscribe(data => {
      console.log(data);
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      this.presentAlert('Your notifiations contains a secret = ' + data.data.secret);
      this.unsub();
    });
    this.localNotifications.schedule({
      id: 1,
      text: 'Single Local Notification',
      data: { secret: 'secret' }
    });

  }
  foreNotif() {
    this.localNotifications.schedule({
      id: 1,
      text: 'Single Enappd Notification',
      data: { secret: 'secret' },
      foreground: true
    });
  }
  multipleNotif() {
    this.localNotifications.schedule([
      {
        id: 1,
        text: 'Multi Enappd Notification 1',
        data: { secret: 'data' }
      }, {
        id: 2,
        title: 'Local Notification Example',
        text: 'Multi Enappd Notification 2',
        icon: 'assets/ionic_white.png'
      }
    ]);
  }

  delayedNotif() {
    this.localNotifications.schedule({
      text: 'Delayed ILocalNotification',
      trigger: { at: new Date(new Date().getTime() + 5000) },
      led: 'FF0000',
      sound: null
    });
  }

  progressNotif() {
    this.localNotifications.schedule({
      title: 'Sync in progress',
      text: 'Copied 2 of 10 files',
      progressBar: { value: 20 }
    });
  }

  multiLineNotif() {
    this.localNotifications.schedule({
      title: 'The Enappd Webinar',
      text: '4:15 - 5:15 PM\nBig Conference Room',
      smallIcon: 'res://calendar',
      icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzfXKe6Yfjr6rCtR6cMPJB8CqMAYWECDtDqH-eMnerHHuXv9egrw'
    });
  }

  actionNotif() {
    this.clickSub = this.localNotifications.on('click').subscribe(data => {
      console.log(data);
      // this.presentAlert('Your notifiations contains a secret = ' + data.data.secret);
      this.unsub();
    });
    this.localNotifications.schedule({
      title: 'The Enappd survey',
      text: 'Are you a fan of Enappd?',
      attachments: ['http://placekitten.com/g/300/200'],
      actions: [
        { id: 'yes', title: 'Yes' },
        { id: 'no', title: 'No' }
      ]
    });
  }

  inputNotif() {
    this.localNotifications.schedule({
      title: 'Justin Rhyss',
      text: 'Do you want to go see a movie tonight?',
      actions: [
        {
          id: 'reply',
          type: ILocalNotificationActionType.INPUT,
          title: 'Reply'
        }
      ]
    });
  }

  groupNotif() {
    this.localNotifications.schedule([
      { id: 0, title: 'Design team meeting' },
      { id: 1, summary: 'me@gmail.com', group: 'email', groupSummary: true },
      { id: 2, title: 'Please take all my money', group: 'email' },
      { id: 3, title: 'A question regarding this plugin', group: 'email' },
      { id: 4, title: 'Wellcome back home', group: 'email' }
    ]);
  }

  readmore() {
    window.open('http://enappd.com/blog', '_blank')
  }

}
