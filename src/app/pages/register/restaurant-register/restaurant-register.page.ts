import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { matchValidator } from 'src/app/validation/match';
import { Geolocation } from '@capacitor/geolocation';
import { LoadingController, Platform } from '@ionic/angular';
import { HttpService } from 'src/app/services/http.service';
import { AppConstants } from 'src/app/config/app-constants';
import { LocalFile } from 'src/app/interfaces/local-file';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-restaurant-register',
  templateUrl: './restaurant-register.page.html',
  styleUrls: ['./restaurant-register.page.scss'],
})
export class RestaurantRegisterPage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;
  images: LocalFile[] = [];



  constructor(
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private storageService: StorageService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private plt: Platform,
    private httpService: HttpService) { }

  get errorControl() {
    return this.ionicForm.controls;
  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      nomRestaurant: ['', [Validators.required, Validators.minLength(3)]],
      nomGerant: ['', [Validators.required, Validators.minLength(3)]],
      prenomGerant: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      adresse: ['', [Validators.required]],
      ville: ['', [Validators.required]],
      longitude: ['', [Validators.pattern('[+-]?([0-9]*[.])?[0-9]+'), Validators.required]],
      latitude: ['', [Validators.pattern('[+-]?([0-9]*[.])?[0-9]+'), Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required, matchValidator('password')]],
      image: ['', Validators.required],
    });
    this.emptyDirectory();
    this.loadFiles();
  }

  getCurrentPosition() {
    Geolocation.requestPermissions().then(async premission => {
      const loading = await this.loadingCtrl.create({
        message: 'en cours de traitement...',
      });
      await loading.present();
      const coordinates = await Geolocation.getCurrentPosition();
      this.ionicForm.controls.latitude.setValue(coordinates.coords.latitude);
      this.ionicForm.controls.longitude.setValue(coordinates.coords.longitude);
      loading.dismiss();
    });
  }


  async submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {

      await this.startUpload(this.images);
      console.log(this.ionicForm.value);
    }
  }

  async signAction(formData: FormData) {
    const loading = await this.loadingCtrl.create({
      message: 'Chargement en cours...',
    });
    await loading.present();

    this.authService.signupRestaurant(formData).pipe(
      finalize(() => {
        loading.dismiss();
      })
    ).subscribe(
      (res: any) => {
        if (res.success) {
          console.log(res);
          // Storing the User data.
          this.storageService
            .store(AppConstants.auth, res.data)
            .then(() => {
              if (res.data.role === 'clt') {
                this.router.navigate(['client']);
              }
              else {
                this.router.navigate(['restaurant']);
              }
              // this.router.navigate(['client']);
            });
        } else {
          this.toastService.presentToast(
            'erreur de serveur'
          );
        }
      },
      (error: any) => {
        this.toastService.presentToast('Network Issue.');
      }
    );

  }

  emptyDirectory() {
    Filesystem.readdir({
      path: AppConstants.imageDir,
      directory: Directory.Data,
    }).then(async result => {
      if (result.files.length) {
        for (let file of result.files) {
          await Filesystem.deleteFile({
            directory: Directory.Data,
            path: `${AppConstants.imageDir}/${file}`,
          });
        }
      }
    },
      async (err) => {

      }
    );
  }

  async loadFiles() {
    this.images = [];

    const loading = await this.loadingCtrl.create({
      message: 'Chargement...',
    });
    await loading.present();

    Filesystem.readdir({
      path: AppConstants.imageDir,
      directory: Directory.Data,
    }).then(result => {
      if (result.files.length !== 0) {
        this.loadFileData(result.files);
      } else {
        this.ionicForm.controls.image.setValue('');
      }
    },
      async (err) => {
        // Folder does not yet exists!
        await Filesystem.mkdir({
          path: AppConstants.imageDir,
          directory: Directory.Data,
        });
      }
    ).then(_ => {
      loading.dismiss();
    });
  }

  // Get the actual base64 data of an image
  // base on the name of the file
  async loadFileData(fileNames: string[]) {
    for (let f of fileNames) {
      const filePath = `${AppConstants.imageDir}/${f}`;

      const readFile = await Filesystem.readFile({
        path: filePath,
        directory: Directory.Data,
      });

      this.images.push({
        name: f,
        path: filePath,
        data: `data:image/jpeg;base64,${readFile.data}`,
      });
      this.ionicForm.controls.image.setValue('set');

    }
  }

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt // Camera, Photos or Prompt!
    }).catch(err => {

    });;

    if (image) {
      this.saveImage(image);
      console.log(image);
    }
  }

  // Create a new file from a capture image
  async saveImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);

    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: `${AppConstants.imageDir}/${fileName}`,
      data: base64Data,
      directory: Directory.Data
    });

    // Reload the file list
    // Improve by only loading for the new image and unshifting array!
    this.loadFiles();
  }
  // https://ionicframework.com/docs/angular/your-first-app/3-saving-photos
  private async readAsBase64(photo: Photo) {
    if (this.plt.is('hybrid')) {
      const file = await Filesystem.readFile({
        path: photo.path
      });

      return file.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }
  }
  // Helper function
  // eslint-disable-next-line @typescript-eslint/member-ordering
  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  // eslint-disable-next-line @typescript-eslint/member-ordering
  async deleteImage(file: LocalFile) {
    await Filesystem.deleteFile({
      directory: Directory.Data,
      path: file.path
    });
    this.loadFiles();
    this.toastService.presentToast('File removed.');
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  async startUpload(files: LocalFile[]) {

    const formData = new FormData();
    // eslint-disable-next-line guard-for-in
    for (let index in files) {
      const response = await fetch(files[index].data);
      const blob = await response.blob();
      formData.append('file[]', blob, files[index].name);

    }

    formData.append('adresse', this.ionicForm.controls.adresse.value);
    formData.append('description', this.ionicForm.controls.description.value);
    formData.append('nomRestaurant', this.ionicForm.controls.nomRestaurant.value);
    formData.append('nomGerant', this.ionicForm.controls.nomGerant.value);
    formData.append('prenomGerant', this.ionicForm.controls.prenomGerant.value);
    formData.append('ville', this.ionicForm.controls.ville.value);
    formData.append('longitude', this.ionicForm.controls.longitude.value);
    formData.append('latitude', this.ionicForm.controls.latitude.value);
    formData.append('email', this.ionicForm.controls.email.value);
    formData.append('password', this.ionicForm.controls.password.value);
    formData.append('confirmPassword', this.ionicForm.controls.confirmPassword.value);
    formData.append('image', this.ionicForm.controls.image.value);


    // this.ionicForm.patchValue({ file: formData });
    this.signAction(formData);
  }

  // Upload the formData to our API
  // eslint-disable-next-line @typescript-eslint/member-ordering
  async uploadData(formData: FormData) {

    const loading = await this.loadingCtrl.create({
      message: 'Chargement en cours...',
    });
    await loading.present();

    return (await (this.httpService.authPost(AppConstants.addMenu, formData))).pipe(
      finalize(() => {
        loading.dismiss();
      })
    ).subscribe((res: any) => {
      if (res.success) {
        // this.router.navigate(['home']);
        console.log(res);

      }
    },
      (error: any) => {
        console.log(error);
        console.log('Network Issue.');
      });
  }
}


