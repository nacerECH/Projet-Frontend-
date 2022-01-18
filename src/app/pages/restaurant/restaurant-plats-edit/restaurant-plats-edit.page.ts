import { Component, OnDestroy, OnInit } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { AppConstants } from 'src/app/config/app-constants';
import { LocalFile } from 'src/app/interfaces/local-file';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { ToastService } from 'src/app/services/toast.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import { finalize } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-restaurant-plats-edit',
  templateUrl: './restaurant-plats-edit.page.html',
  styleUrls: ['./restaurant-plats-edit.page.scss'],
})
export class RestaurantPlatsEditPage implements OnInit, OnDestroy {

  ionicForm: FormGroup;
  isSubmitted = false;
  images: LocalFile[] = [];
  data: Array<any> = [
    { name: 'Souce Algerienne', value: '1' },
    { name: 'Kitchup', value: '2' },
    { name: 'Soda', value: '3' },
    { name: 'Coca', value: '4' },
    { name: 'frite', value: '5' }
  ];
  // data: any;
  id: any;
  dataSubscription: any;
  acc: any;


  constructor(
    private plt: Platform,
    private loadingCtrl: LoadingController,
    private toastService: ToastService,
    public formBuilder: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    private activatedRoute: ActivatedRoute,

  ) { }

  get errorControl() {
    return this.ionicForm.controls;
  };

  async ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      titre: ['', [Validators.required]],
      image: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.pattern('[+-]?([0-9]*[.])?[0-9]+'), Validators.required]],
      promoPrice: [null, [Validators.pattern('[+-]?([0-9]*[.])?[0-9]+'), Validators.required]],
      checkArray: this.formBuilder.array([])
    });
    this.loadFiles();
    this.emptyDirectory();
    this.getAcc();
  }
  async getAcc() {

    const loading = await this.loadingCtrl.create({
      message: 'Chargement en cours...',
    });
    await loading.present();
    return (await (this.httpService.authGet(AppConstants.getAcc))).pipe(
      finalize(() => {
        loading.dismiss();
      })
    ).subscribe((res: any) => {
      if (res.success) {
        console.log(res);
        console.log();
        this.acc = res.data.accompagnements;
        console.log(this.acc);

      }
    },
      (error: any) => {
        this.toastService.presentToast('Pas de resultat');
        console.log(error);
        console.log('HAMZA' + JSON.stringify(error));
        console.log('Network Issue.');
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
  async submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      console.log(this.ionicForm.value);
      await this.startUpload(this.images);

    }
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  async startUpload(files: LocalFile[]) {

    this.dataSubscription = await this.activatedRoute.paramMap.subscribe(async params => {
      console.log(params.get('id'));
      console.log(params);
      this.id = params.get('id');
    }, error => {
      console.log(error);
    });
    const formData = new FormData();
    // eslint-disable-next-line guard-for-in
    for (let index in files) {
      const response = await fetch(files[index].data);
      const blob = await response.blob();
      formData.append('file[]', blob, files[index].name);

    }
    formData.append('id', this.id);
    formData.append('nom', this.ionicForm.controls.titre.value);
    formData.append('description', this.ionicForm.controls.description.value);
    formData.append('price', this.ionicForm.controls.price.value);
    formData.append('promoPrice', this.ionicForm.controls.promoPrice.value);
    formData.append('checkArray', JSON.stringify(this.ionicForm.controls.checkArray.value));

    // this.ionicForm.patchValue({ file: formData });
    return await this.uploadData(formData);
  }

  // Upload the formData to our API
  // eslint-disable-next-line @typescript-eslint/member-ordering
  async uploadData(formData: FormData) {
    console.log('FormData');
    console.log(formData);
    const loading = await this.loadingCtrl.create({
      message: 'Chargement en cours...',
    });
    await loading.present();

    return (await (this.httpService.authPost(AppConstants.addPlat, formData))).pipe(
      finalize(() => {
        loading.dismiss();
      })
    ).subscribe((res: any) => {
      if (res.success) {
        this.emptyDirectory();
        this.router.navigateByUrl('/restaurant/plats/' + this.id, {
          replaceUrl: true
        });
        // this.router.navigate(['/restaurant/plats', this.id]);
        console.log(res);

      }
    },
      (error: any) => {
        console.log(error);
        console.log('Network Issue.');
      });
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  onCheckboxChange(e) {
    const checkArray: FormArray = this.ionicForm.get('checkArray') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value === e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering
  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
