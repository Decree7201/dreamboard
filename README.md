Copyright 2025 Google LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

# Disclaimer

DreamBoard is NOT an officially supported Google product.

Copyright 2025 Google LLC. This solution, including any related sample code or data, is made available on an "as is", "as available", and "with all faults" basis, solely for illustrative purposes, and without warranty or representation of any kind. This solution is experimental, unsupported and provided solely for your convenience. Your use of it is subject to your agreements with Google, as applicable, and may constitute a beta feature as defined under those agreements. To the extent that you make any data available to Google in connection with your use of the solution, you represent and warrant that you have all necessary and appropriate rights, consents and permissions to permit Google to use and process that data. By using any portion of this solution, you acknowledge, assume and accept all risks, known and unknown, associated with its usage, including with respect to your deployment of any portion of this solution in your systems, or usage in connection with your business, if at all.

# Overview

![DreamBoard Logo](./images/dreamboard_logo.png)

DreamBoard is an AI-powered solution that generates high-quality video ads by combining AI capabilities with your brand's guidelines and creative direction. It uses a combination of the following AI products:
* Gemini for ideation and brainstorming, allowing users to generate detailed scenes descriptions and image prompts.
* Imagen for text-to-image generation or image editing using reference images.
* Veo for text-to-video and allows using seed images for image-to-video generation.

Other features include inputting brand guidelines for brand consistency, as well as using prompt rewriting and grounding techniques to refine the model’s output with realistic visuals.

The combination of the 3 AI products allows creation of ad videos from concept to storyboard to video generation.  As videos normally contain different scenes, DreamBoard allows creating videos of separate scenes, giving the user the opportunity to generate videos for that scene until it is suitable for the final video.  The scene videos are all stitched together in the end, creating the final video.  DreamBoard also includes post processing steps in the final video such as creating transitions between scenes, placement of logos and text (to be included soon).  The objective is to allow the user to be more creative by giving them greater control over each scene in the process.

# Why use DreamBoard

![DreamBoard Workflow Overview](./images/dreamboard_workflow_overview.png)

DreamBoard is a tool that can be used for quick storyboarding or end-to-end video production.   It is a tool created for AI-generated videos using a combination of Gemini, Imagen, and Veo with capabilities of:
- ad brainstorming
- prompt rewriting
- text-to-image
- text-to-video
- text-and-image-to-image
- text-and-image-to-video
- enforcing brand guidelines in image/video

It also includes extra configuration settings from the backend APIs that is mostly occluded from frontend tools, giving users more freedom to get results in the format required.

# How DreamBoard Works

DreamBoard contains a frontend and backend component.  The backend performs all the AI generation functions (text, image, video) and accessed through API calls using FastAPI.  The frontend is an Angular UI that stitches all the workflow steps together.  This decoupling allows developers who are only interested in the backend generation capabilities of DreamBoard to develop their own UI or agents while still using the DreamBoard backend.

![DreamBoard General Flow](./images/dreamboard-general-flow.png)

# Requirements

Requires a GCP project with billing account enabled and access to Gemini, Imagen, and Veo.

Please refer to the README of the backend and frontend individually for requirements and detailed deployment instructions.

# Get Started

Please refer to the README of the backend and frontend individually for installation instructions.  For deployments on GCP, you will need to install the backend before the frontend.

# Pricing and Fees

Please refer to the [generative AI pricing page](https://cloud.google.com/vertex-ai/generative-ai/pricing) for pricing information on Gemini, Imagen, and Veo.  Please use the [pricing calculator](https://cloud.google.com/products/calculator) for cost on other resources used from GCP including Cloud Run Service and Cloud Storage.

# License

Apache 2.0

This is not an official Google product.
