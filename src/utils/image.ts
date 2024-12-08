import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import firebasedb from 'firebasedb';

const storage = getStorage(firebasedb);

type StorageDirectory = 'static' | 'board';

export const uploadImage = async (
  file: File, 
  directory: StorageDirectory,
): Promise<string> => {
  try {
    const storageRef = ref(storage, `${directory}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // 진행 상태 확인
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error('Upload failed:', error);
          reject(error);
        },
        async () => {
          // 업로드 완료 후 다운로드 URL 가져오기
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('File available at:', downloadURL);
          resolve(downloadURL);
        }
      );
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};