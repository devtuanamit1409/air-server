from collections import defaultdict
from pymongo.mongo_client import MongoClient
uri = "mongodb+srv://vanhung909080:HcsjybkhVxXfOrfX@cluster0.mlgopbm.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(uri)
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from bson import ObjectId
db = client['test']

orders = db['orders']
all_tours = db['tours']

data_order = list(orders.find())
data_tour = list(all_tours.find())
user_history = defaultdict(list)
for order in data_order:
    user_id = order["idUser"]
    for item in order["cart"]:
        tour_id = item["id"]
        user_history[user_id].append(tour_id)
# Tính ma trận người dùng-tour (0/1) dựa trên lịch sử đặt hàng
users = list(user_history.keys())
tours = list(set(tour_id for tour_list in user_history.values() for tour_id in tour_list))
user_tour_matrix = np.zeros((len(users), len(tours)))
for i, user_id in enumerate(users):
    for j, tour_id in enumerate(tours):
        if tour_id in user_history[user_id]:
            user_tour_matrix[i, j] = 1

user_similarity_matrix = cosine_similarity(user_tour_matrix) # tính cosin của các danh mục trong order

# Hàm để đề xuất các tour cho người dùng dựa trên lịch sử đặt hàng
def recommend_tours(user_id, all_tours, top_n=10): # top_n = giới hạn tour được hiển thị
    user_index = users.index(user_id)
    user_similarities = user_similarity_matrix[user_index]
    similar_users_indices = np.argsort(user_similarities)[::-1][1:]  # Sắp xếp theo tương đồng giảm dần
    recommended_tours_info = []
    for similar_user_index in similar_users_indices:
        similar_user_id = users[similar_user_index]
        tours_not_purchased = set(user_history[similar_user_id]) - set(user_history[user_id])
        # Lặp qua con trỏ của bảng tours
        for tour in data_tour:
            tour_id = str(tour["_id"])
            if tour_id in tours_not_purchased:
                recommended_tours_info.append(tour)
        if len(recommended_tours_info) >= top_n:
            break
    return recommended_tours_info[:top_n]



# Ví dụ sử dụng
user_id_to_recommend = "656317c9b5709c23d7ab9b30"
recommended_tours_info = recommend_tours(user_id_to_recommend, all_tours)
print(len(recommended_tours_info))
user_to_update = db['users'].find_one({"_id": ObjectId(user_id_to_recommend)})
if user_to_update:
    # Lấy danh sách các tour được đề xuất
    recommended_tour_ids = recommended_tours_info
    # Cập nhật trường recommitList trong bảng users
    db['users'].update_one(
        {"_id": ObjectId(user_id_to_recommend)},
        {"$set": {"recommitList": recommended_tour_ids}}
    )
    print("recommitList updated successfully.")
else:
    print(f"User with ID {user_id_to_recommend} not found.")