#!/usr/bin/env python3
"""
Simple HTTP server for Studio Arteamo Portfolio
Runs on port 8090 to avoid conflicts with existing services
"""

import http.server
import socketserver
import os
import sys
from pathlib import Path

# Configuration
PORT = 8090
DIRECTORY = "/root/Interiori/websites"

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Add headers for better compatibility
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()
    
    def log_message(self, format, *args):
        # Custom logging
        sys.stdout.write(f"[Arteamo Portfolio] {self.address_string()} - {format % args}\n")
        sys.stdout.flush()

def main():
    os.chdir(DIRECTORY)
    
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        print(f"🎨 Studio Arteamo Portfolio Server")
        print(f"="*50)
        print(f"✅ Server started successfully!")
        print(f"📂 Serving directory: {DIRECTORY}")
        print(f"🌐 Access URLs:")
        print(f"   - Local: http://localhost:{PORT}")
        print(f"   - Network: http://0.0.0.0:{PORT}")
        print(f"="*50)
        print(f"Press Ctrl+C to stop the server\n")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped.")
            return 0

if __name__ == "__main__":
    sys.exit(main())