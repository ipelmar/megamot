import pandas as pd
import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate('reveal-megamot-firebase-adminsdk-fbsvc-bfab41818e.json')
firebase_admin.initialize_app(cred)
df = pd.read_csv('file.csv')
db = firestore.client()

collection_name = 'students'

for index, row in df.iterrows():
    code = str(row['ת.ז'])

    data = row.to_dict()
    student_id = data["ת.ז"]
    del data["ת.ז"]
    try: 
        db.collection(collection_name).document(str(student_id)).set(data)
    except Exception as e:
        print(f"error  student {student_id}: {e}")
        

print("success")