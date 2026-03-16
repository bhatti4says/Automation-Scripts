import os
from dotenv import load_dotenv

# Load the .env file
load_dotenv()

# Attempt to retrieve the variables
user = os.getenv("NET_USERNAME")
ip = os.getenv("CORE_IP")

if user and ip:
    print(f"✅ Success! Found Username: {user}")
    print(f"✅ Success! Found Core IP: {ip}")
    print("🔒 Password is loaded in memory (not printed for security).")
else:
    print("❌ Failure: Could not find variables. Check your .env file location.")
