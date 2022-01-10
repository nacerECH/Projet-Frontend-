import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { AppConstants } from 'src/app/config/app-constants';
import { LocalFile } from 'src/app/interfaces/local-file';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { ToastService } from 'src/app/services/toast.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { HttpService } from 'src/app/services/http.service';

import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.page.html',
  styleUrls: ['./add-category.page.scss'],
})
export class AddCategoryPage implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;
  images: LocalFile = null;

  constructor(
    private plt: Platform,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastService: ToastService,
    public formBuilder: FormBuilder,
    private router: Router,
    private storageService: StorageService,
    private httpService: HttpService
  ) { }

  get errorControl() {
    return this.ionicForm.controls;
  }

  ngOnInit() {
    this.emptyDirectory();
    // this.loadFiles();
    this.ionicForm = this.formBuilder.group({
      titre: ['', [Validators.required]],
      image: ['', Validators.required],
      description: [],
    });
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
    this.images = null;

    const loading = await this.loadingCtrl.create({
      message: 'Loading data...',
    });
    await loading.present();

    Filesystem.readdir({
      path: AppConstants.imageDir,
      directory: Directory.Data,
    }).then(result => {
      if (result.files.length) {
        this.loadFileData(result.files[result.files.length - 1]);
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
  async loadFileData(fileName: string) {

    const filePath = `${AppConstants.imageDir}/${fileName}`;
    const readFile = await Filesystem.readFile({
      path: filePath,
      directory: Directory.Data,
    });
    this.images = {
      name: fileName,
      path: filePath,
      data: `data:image/jpeg;base64,${readFile.data}`,
    };
    this.ionicForm.controls.image.setValue('set');

  }
  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Prompt // Camera, Photos or Prompt!
    }).catch(err => {

    });

    if (image) {
      this.saveImage(image);
    }
  }
  // Create a new file from a capture image
  async saveImage(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);

    const fileName = new Date().getTime() + '.jpeg';
    this.emptyDirectory();
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
    this.toastService.presentToast('Image supprimer');

  }

  // Convert the base64 to blob data
  // and create  formData with it
  // eslint-disable-next-line @typescript-eslint/member-ordering
  async startUpload(file: LocalFile) {
    const response = await fetch(file.data);
    const blob = await response.blob();
    const formData = new FormData();
    formData.append('file', blob, file.name);
    formData.append('nom', this.ionicForm.controls['titre'].value);
    formData.append('description', this.ionicForm.controls['description'].value);
    // this.ionicForm.patchValue({ file: formData });
    return await this.uploadData(formData);
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

  // eslint-disable-next-line @typescript-eslint/member-ordering
  async submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {

      await this.startUpload(this.images);

    }
  }

}


