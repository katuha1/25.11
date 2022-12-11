import requests, random


def main(ids):
    litter = "qwertyuiop[asdfghjklzxcvbnm123456789"
    url = "http://localhost:3000/dashboard/addtask"
    data = {
        "head": "".join([random.choice(litter) for _ in range(8)]),
        "desc": ''.join([random.choice(litter) for _ in range(8)]),
        "date": f"2022-{random.randint(10, 12)}-{random.randint(10, 25)}",
        "author": ''.join([random.choice(litter) for _ in range(8)])
    }

    resp = requests.post(url, data=data)
    print(data)
    print(resp.status_code)


if __name__ == '__main__':
    ids = 0
    for i in range(5):
        ids += 1
        main(ids)
