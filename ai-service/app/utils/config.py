from pydantic import BaseModel


class Settings(BaseModel):
    app_name: str = "Sports Odds AI Service"
    margin: float = 0.05
    home_advantage_boost: float = 0.05


settings = Settings()
