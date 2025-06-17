# Copyright 2025 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""API Entry point where the app and routers are set up."""
import logging
from fastapi import FastAPI
import uvicorn
from starlette.middleware import cors
from api.router import api_router
from core.config import settings


logger = logging.getLogger(__name__)
logging.basicConfig(filename="myapp.log", level=logging.INFO)


# Initialize FastAPI app
app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_PREFIX}/openapi.json",
)

# Set all CORS enabled origins if specified in settings
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        cors.CORSMiddleware,
        allow_origins=["*"],  # Allows all origins
        allow_credentials=True,
        allow_methods=["*"],  # Allows all methods
        allow_headers=["*"],  # Allows all headers
    )

# Include the API router with a defined prefix
app.include_router(api_router, prefix=settings.API_PREFIX)

# Run the Uvicorn server when the script is executed directly
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
