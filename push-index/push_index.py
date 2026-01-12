import requests
import urllib.parse

# DEINE DATEN
REPO_URL = "https://github.com/juliamccarren/juliamccarren"
IDENTITY_FILE = f"{REPO_URL}/identity.jsonld"

def push_to_search_engines():
    print(f"🚀 Starte Push für: {IDENTITY_FILE}\n")
    
    # 1. Google Ping (Sitemap-Methode)
    google_ping = f"https://www.google.com/ping?sitemap={urllib.parse.quote(IDENTITY_FILE)}"
    try:
        r_google = requests.get(google_ping)
        print(f"[Google] Ping gesendet. Status: {r_google.status_code} (200 = Erfolg)")
    except Exception as e:
        print(f"[Google] Fehler: {e}")

    # 2. Bing Ping (IndexNow-Schnittstelle)
    # Bing akzeptiert Pings für URLs direkt
    bing_ping = f"https://www.bing.com/ping?sitemap={urllib.parse.quote(IDENTITY_FILE)}"
    try:
        r_bing = requests.get(bing_ping)
        print(f"[Bing]   Ping gesendet. Status: {r_bing.status_code}")
    except Exception as e:
        print(f"[Bing]   Fehler: {e}")

    # 3. Google PubSubHubbub (Der "Echtzeit"-Push für Feeds)
    hub_url = "https://pubsubhubbub.appspot.com/"
    data = {'hub.mode': 'publish', 'hub.url': IDENTITY_FILE}
    try:
        r_hub = requests.post(hub_url, data=data)
        print(f"[Hub]    PubSubHubbub benachrichtigt. Status: {r_hub.status_code}")
    except Exception as e:
        print(f"[Hub]    Fehler: {e}")

    print("\n✅ Pings abgeschlossen.")
    print(f"🔗 Letzter Schritt: Öffne {REPO_URL} einmal im Chrome-Browser, während du eingeloggt bist.")

if __name__ == "__main__":
    push_to_search_engines()