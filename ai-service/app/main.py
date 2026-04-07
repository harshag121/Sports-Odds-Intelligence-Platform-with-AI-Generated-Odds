from fastapi import FastAPI

from app.routes.health import router as health_router
from app.routes.odds import router as odds_router
from app.utils.config import settings

app = FastAPI(title=settings.app_name)

app.include_router(health_router)
app.include_router(odds_router)
