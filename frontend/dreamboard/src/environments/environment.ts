/***************************************************************************
 *
 *  Copyright 2025 Google Inc.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 *  Note that these code samples being shared are not official Google
 *  products and are not formally supported.
 *
 ***************************************************************************/

export const environment = {
  production: true,
  videoGenerationApiURL: 'https://dreamboard-backend-180911835097.us-central1.run.app/api/video_generation',
  imageGenerationApiURL: 'https://dreamboard-backend-180911835097.us-central1.run.app/api/image_generation',
  textGenerationApiURL: 'https://dreamboard-backend-180911835097.us-central1.run.app/api/text_generation',
  audioGenerationApiURL: 'https://dreamboard-backend-180911835097.us-central1.run.app/api/audio_generation',
  fileUploaderApiURL: 'https://dreamboard-backend-180911835097.us-central1.run.app/api/file_uploader',
  storiesStorageApiURL: 'https://dreamboard-backend-180911835097.us-central1.run.app/api/story_storage',
  clientID: '180911835097-l59b6sfntp0jq2gec0n57kiuaeblg80b.apps.googleusercontent.com',
  proxyURL: '', // proxy url is just api/handleRequest for Nodejs server in PROD
};
