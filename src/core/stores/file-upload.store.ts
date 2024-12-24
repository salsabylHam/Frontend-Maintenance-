import { defineStore } from 'pinia';
import { env } from '../constants';
import { AxiosProgressEvent } from 'axios';

export const useFileUploadStore = defineStore('fileUpload', {
  persist: true,
  state: () => ({}),
  getters: {},
  actions: {
    uploadFile: function (files: any, onUploadProgress?: (progressEvent: AxiosProgressEvent) => void): any {
      var formData = new FormData();
      [...files].forEach((file) => {
        formData.append('file', file);
      });
      return window.$axios.post(`${env.BACKEND_BASE_URL}/api/v1/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: onUploadProgress,
      });
    },
  },
});