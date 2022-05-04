from riak import RiakClient

# properties
PORT = 8087
BUCKET = "s15295"
KEY = "zad2"

# connection
client = RiakClient(pb_port=PORT)
bucket = client.bucket(BUCKET)

# insertion
doc = {"var2": 999, "var3": True, "var4": "new value"}
bucket.new(KEY, data=doc).store()

# get value (before edit)
fetched = bucket.get(KEY)
read_val = fetched.data
print("Before edit:  ", read_val)

# edited value
fetched.data["var3"] = False
fetched.store()

# get value (after edited)
fetched = bucket.get(KEY)
read_val = fetched.data
print("After edited: ", read_val)

# deleted doc
fetched.delete()

# get value (after deleted)
fetched = bucket.get(KEY)
read_val = fetched.data
print("After deleted:", read_val)
