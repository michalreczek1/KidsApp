# 🚀 Szybki Start - Family Manager

## Instalacja i Uruchomienie

### Krok 1: Otwórz aplikację
Po prostu otwórz plik `family-manager.html` w przeglądarce (Chrome, Edge, Firefox, Safari).

**Aplikacja działa bez instalacji serwera!** Wszystkie zależności są pobierane z CDN.

### Krok 2: Wybierz profil
Na ekranie startowym zobaczysz 2 przykładowe profile:
- 🦁 Leo
- 🦄 Mia

Kliknij na profil aby wejść do panelu dziecka.

### Krok 3: Zaznaczaj zadania
Dziecko może zaznaczać wykonane zadania klikając checkbox.
Zadania oznaczone przez dziecko czekają na akceptację rodzica.

### Krok 4: Dostęp administratora
**Metoda 1 (Polecana)**:
1. Przytrzymaj logo 🏠 przez 2 sekundy
2. Pojawi się okno z prośbą o PIN
3. Wpisz: **1234**

**Metoda 2**:
Możesz zmienić kod aby pokazać przycisk admina bezpośrednio.

### Krok 5: Zatwierdź zadania (Admin)
W panelu administratora:
1. Zakładka "Do zatwierdzenia"
2. Kliknij "✓ Zatwierdź" przy każdym zadaniu
3. System automatycznie:
   - Oceni czy dzień jest PASSED
   - Przyzna punkty (jeśli wszystkie MIN zatwierdzone)
   - Zaktualizuje passę
   - Sprawdzi nagrody

## 📱 Instalacja jako PWA (Progressive Web App)

### Na Komputerze (Chrome/Edge):
1. Otwórz `family-manager.html` w przeglądarce
2. Kliknij ikonę instalacji w pasku adresu (➕ lub komputer)
3. Kliknij "Instaluj"
4. Aplikacja pojawi się jako osobne okno

### Na iOS (iPhone/iPad):
1. Otwórz w Safari
2. Kliknij przycisk "Udostępnij" (kwadrat ze strzałką)
3. Przewiń i wybierz "Dodaj do ekranu głównego"
4. Nadaj nazwę i kliknij "Dodaj"
5. Ikona 🏠 pojawi się na ekranie głównym

### Na Androidzie:
1. Otwórz w Chrome
2. Menu (⋮) → "Dodaj do ekranu głównego"
3. Potwierdź
4. Ikona pojawi się na ekranie głównym

## ⚡ Szybkie Wskazówki

### Dla Dzieci:
- **Zaznaczaj zadania** każdego dnia
- **Sprawdzaj status dnia** - czy jest zaliczony (✅ PASSED)
- **Buduj passę** - kolejne dni zaliczone
- **Odblokowuj nagrody** - zbieraj punkty i buduj idealne tygodnie

### Dla Rodziców:
- **Zatwierdzaj zadania** każdego dnia (zakładka "Do zatwierdzenia")
- **Monitoruj postępy** w zakładce "Dzieci"
- **Wydawaj nagrody** w zakładce "Nagrody" (przycisk "Wydano")
- **Dostosuj zadania** - edytuj w kodzie lub localStorage

## 🎯 Kluczowe Zasady

### System 100%/0%
- Dzień jest **ZALICZONY** gdy wszystkie zadania MIN są zatwierdzone
- Dzień jest **NIEZALICZONY** gdy choć 1 MIN brakuje
- Dni nieaktywne (weekend) = **N/A** (nie liczą się, nie przerywają passy)

### Punkty
- **5 punktów** za każdy zaliczony dzień
- **20 punktów bonusu** za idealny tydzień (wszystkie dni aktywne PASSED)
- Punkty przyznawane **tylko raz** za dzień (anty-dublowanie)
- **Brak punktów** za pojedyncze zadania

### Passa
- Liczba **kolejnych dni aktywnych** ze statusem PASSED
- Dni N/A **nie przerywają** passy
- FAILED **resetuje** passę do 0

### Nagrody
Odblokowanie gdy:
- Punkty osiągną próg (np. 30, 60, 90)
- Passa osiągnie cel (np. 7 dni)
- Idealne tygodnie z rzędu (np. 2)

## 🛠️ Dostosowywanie

### Zmien PIN administratora:
Wejdz do: `Panel Administratora -> Ustawienia -> Parametry Punktow`.
Wpisz nowy PIN (4-8 cyfr) i kliknij `Zapisz Ustawienia`.

### Zmien punkty:
W tym samym miejscu ustawisz:
- Punkty za zaliczony dzien
- Bonus za idealny tydzien

### Dodaj dziecko:
Wejdź do localStorage w devtools lub edytuj kod w sekcji `getInitialData()`.

### Zmień dni aktywne:
```javascript
activeDays: [1, 2, 3, 4, 5] // 1=Pn, 2=Wt, ..., 7=Nd
```

## 🔍 Debugowanie

### Sprawdź localStorage:
1. Otwórz DevTools (F12)
2. Zakładka "Application" → "Local Storage"
3. Znajdź klucz `familyManagerData`
4. Możesz edytować JSON ręcznie

### Reset danych:
W konsoli przeglądarki:
```javascript
localStorage.removeItem('familyManagerData');
location.reload();
```

### Sprawdź logi:
Otwórz konsolę (F12) i sprawdź komunikaty.

## 📊 Przykładowy Harmonogram

### Dzień 1 (Poniedziałek):
- Dziecko zaznacza wykonane zadania
- Rodzic zatwierdza wieczorem
- System przyznaje punkty jeśli wszystkie MIN ✓
- Status dnia: PASSED → Passa: 1

### Dzień 7 (Niedziela):
- N/A (dzień nieaktywny)
- Passa nie resetuje się
- Brak punktów (normalnie)

### Tydzień 2:
- Wszystkie dni Pn-Pt PASSED
- System wykrywa idealny tydzień
- Bonus +20 punktów
- Możliwe odblokowanie nagrody

## ✅ Checklist Pierwszego Uruchomienia

- [ ] Otwórz `family-manager.html`
- [ ] Przetestuj wybór profilu
- [ ] Zaznacz kilka zadań jako dziecko
- [ ] Odblokuj panel admina (PIN: 1234)
- [ ] Zatwierdź zadania
- [ ] Sprawdź czy punkty się przyznały
- [ ] Sprawdź passę i status dnia
- [ ] (Opcjonalnie) Zainstaluj jako PWA

## 🆘 Problemy?

### Aplikacja nie działa:
- Sprawdź czy masz połączenie z internetem (CDN dla bibliotek)
- Sprawdź konsolę przeglądarki (F12)
- Upewnij się że używasz nowoczesnej przeglądarki

### Punkty się nie przyznają:
- Sprawdź czy **wszystkie** zadania MIN są zatwierdzone
- Sprawdź czy dzień jest aktywny (nie weekend jeśli aktywne są Pn-Pt)
- Sprawdź localStorage czy `dayPointsGranted` nie blokuje

### Passa się resetuje:
- Sprawdź czy któryś z dni aktywnych nie był FAILED
- Dni N/A nie resetują passy

## 📞 Wsparcie

Aplikacja jest open source i można ją dowolnie modyfikować.
Wszystkie funkcje są w jednym pliku HTML dla łatwości edycji.

---

**Miłego korzystania z Family Manager! 🏠✨**

## Railway (deploy w 5 minut)

1. Wrzuc projekt na GitHub.
2. W Railway kliknij `New Project` -> `Deploy from GitHub repo`.
3. Wybierz repo z tym projektem.
4. Railway uruchomi aplikacje komenda `npm start`.
5. Wejdz na URL z Railway.

Lokalny test deployu:
```bash
npm start
```
Otworz `http://localhost:3000`.

## Ważne: punkty i PIN

Punkty za dzien, bonus tygodniowy i PIN admina zmieniasz teraz w aplikacji:
`Panel Administratora -> Ustawienia -> Parametry Punktow`.


