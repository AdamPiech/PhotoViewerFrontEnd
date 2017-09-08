<template>
    <div class="form">
        <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
            <div class="dropbox">
                <input type="file" 
                       multiple :name="uploadFieldName" :disabled="isSaving" 
                       v-on:change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" 
                       accept="image/*" 
                       class="input-file">
                <p v-if="isInitial">
                    Drag your file(s) here to begin<br> or click to browse
                </p>
                <p v-if="isSaving">
                    Uploading {{ fileCount }} files...
                </p>
            </div>
        </form>
        <div v-if="isSuccess">
            <h2>Uploaded {{ uploadedFiles.length }} file(s) successfully.</h2>
            <button v-on:click="reset">
                Upload again
            </button>
            <ul class="list-unstyled">
                <li v-for="item in uploadedFiles">
                    <img :src="item.url" class="img-responsive img-thumbnail" :alt="item.originalName">
                </li>
            </ul>
        </div>
        <div v-if="isFailed">
            <h2>Uploaded failed.</h2>
            <button v-on:click="reset">
                Try again
            </button>
            <pre>{{ uploadError }}</pre>
        </div>
    </div>
</template>

<script>
// import { upload } from '@/scripts/file-upload';
// import { upload } from '@/scripts/file-upload.fake';
import putFiles from '@/services/s3storage';

  const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

  export default {
    name: 'form',
    data() {
      return {
        uploadedFiles: [],
        uploadError: null,
        currentStatus: null,
        uploadFieldName: 'photos'
      }
    },
    computed: {
      isInitial() {
        return this.currentStatus === STATUS_INITIAL;
      },
      isSaving() {
        return this.currentStatus === STATUS_SAVING;
      },
      isSuccess() {
        return this.currentStatus === STATUS_SUCCESS;
      },
      isFailed() {
        return this.currentStatus === STATUS_FAILED;
      }
    },
    methods: {
      reset() {
        this.currentStatus = STATUS_INITIAL;
        this.uploadedFiles = [];
        this.uploadError = null;
      },
      // save(formData) {
        save(fileList) {
          this.currentStatus = STATUS_SAVING;
          s3storage.putFiles(fileList);
          this.currentStatus = STATUS_SUCCESS;
        // upload(formData)
        //   .then(x => {
        //     this.uploadedFiles = [].concat(x);
        //     this.currentStatus = STATUS_SUCCESS;
        //   })
        //   .catch(err => {
        //     this.uploadError = err.response;
        //     this.currentStatus = STATUS_FAILED;
        //   });
      },
      filesChange(fieldName, fileList) {
        // const formData = new FormData();
        if (!fileList.length) return;
        // Array
        //   .from(Array(fileList.length).keys())
        //   .map(x => {
        //     formData.append(fieldName, fileList[x], fileList[x].name);
        //   });
        // this.save(formData);
        this.save(fileList);
      }
    },
    mounted() {
      this.reset();
    },
  }
</script>

<style>
  .form {
      margin-top: 50px;
  }

  .dropbox {
    outline: 2px dashed grey;
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    height: 250px;
    max-width: 80%;
    margin: 0 auto;
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0;
    height: 95%;
    width: 50%;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue;
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 80px 0;
  }
</style>