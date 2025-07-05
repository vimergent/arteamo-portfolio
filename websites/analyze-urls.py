#!/usr/bin/env python3
import os
import urllib.parse
import json

def analyze_project_urls():
    """Analyze project folder names and their URL encodings"""
    
    base_path = "/root/Interiori"
    projects = []
    
    # List all directories in the base path
    for item in os.listdir(base_path):
        item_path = os.path.join(base_path, item)
        if os.path.isdir(item_path) and not item.startswith('.') and item != 'websites':
            # Get first image file for testing
            test_image = None
            try:
                files = os.listdir(item_path)
                for f in files:
                    if f.lower().endswith(('.png', '.jpg', '.jpeg')):
                        test_image = f
                        break
            except:
                pass
            
            # Analyze different encoding methods
            encoded_once = urllib.parse.quote(item, safe='')
            encoded_component = urllib.parse.quote(item, safe='')
            encoded_path = urllib.parse.quote(item, safe='/')
            
            # Check if it contains non-ASCII characters
            has_cyrillic = any(ord(char) > 127 for char in item)
            
            projects.append({
                'folder_name': item,
                'has_cyrillic': has_cyrillic,
                'url_encoded': encoded_once,
                'url_encoded_component': encoded_component,
                'url_encoded_path': encoded_path,
                'test_image': test_image,
                'char_analysis': [
                    {
                        'char': char,
                        'ord': ord(char),
                        'encoded': urllib.parse.quote(char, safe='') if ord(char) > 127 or char in ' ,-_' else char
                    }
                    for char in item
                ]
            })
    
    # Sort projects by name
    projects.sort(key=lambda x: x['folder_name'])
    
    # Print analysis
    print("PROJECT URL ENCODING ANALYSIS")
    print("=" * 80)
    print()
    
    for i, project in enumerate(projects, 1):
        print(f"{i}. {project['folder_name']}")
        print(f"   Has Cyrillic: {project['has_cyrillic']}")
        print(f"   URL Encoded: {project['url_encoded']}")
        if project['test_image']:
            print(f"   Test Image: {project['test_image']}")
        
        # Show character-by-character encoding for Cyrillic projects
        if project['has_cyrillic']:
            print("   Character encoding breakdown:")
            for char_info in project['char_analysis']:
                if char_info['ord'] > 127 or char_info['char'] in ' ,-_':
                    print(f"     '{char_info['char']}' (ord: {char_info['ord']}) -> {char_info['encoded']}")
        print()
    
    # Create a comparison of working vs non-working URLs
    print("\nURL PATTERNS FOR TESTING:")
    print("-" * 80)
    
    for project in projects:
        if project['has_cyrillic'] and project['test_image']:
            folder = project['folder_name']
            encoded = project['url_encoded']
            image = project['test_image']
            
            print(f"\n{folder}:")
            print(f"1. Raw URL: ../{folder}/{image}")
            print(f"2. Encoded folder: ../{encoded}/{image}")
            print(f"3. Fully encoded: ../{encoded}/{urllib.parse.quote(image, safe='')}")
    
    # Save analysis to JSON
    with open('url-analysis.json', 'w', encoding='utf-8') as f:
        json.dump(projects, f, ensure_ascii=False, indent=2)
    
    print("\nAnalysis saved to url-analysis.json")

if __name__ == "__main__":
    analyze_project_urls()