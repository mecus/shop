import { Injectable } from '@angular/core';
import * as firebase from 'firebase';


@Injectable()
export class UploadImageService {
    constructor(){}

    uploadImage(file, path){
        // Create the file metadata

        let storageRef = firebase.storage().ref();
   
        let metadata = {
          contentType: 'image/jpeg'
        }; 
        // Upload file and metadata to the object 'images/mountains.jpg'
        return storageRef.child(path + file.name).put(file, metadata)
        .then((snapshot) => {
            // console.log(snapshot);
            return snapshot;
        })
        .catch((err) => {
            // console.log(err);
            return err;
        });
    }
    removeStorageFile(path, file){
        let storageRef = firebase.storage().ref();
        return storageRef.child(path + file).delete();
    }
}