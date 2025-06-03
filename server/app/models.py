from pydantic import BaseModel

class Transaction(BaseModel):
    user_id: str
    amount: float
    device_id: str
    location: str

    
